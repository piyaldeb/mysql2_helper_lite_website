const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const geoip = require('geoip-lite');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mysql2-helper-lite';

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('[api] MongoDB connection established'))
  .catch((error) => {
    console.error('[api] Failed to connect to MongoDB', error);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

const featureSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    code: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const exampleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: String, default: 'general' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const statsSchema = new mongoose.Schema(
  {
    totalDownloads: { type: Number, default: 0 },
    githubStars: { type: Number, default: 0 },
    activeUsers: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const visitorSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true },
    userAgent: { type: String },
    referer: { type: String },
    path: { type: String, default: '/' },
    country: { type: String },
    city: { type: String },
    device: { type: String },
    browser: { type: String },
    os: { type: String },
    sessionId: { type: String },
    visitDuration: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index for faster queries
visitorSchema.index({ timestamp: -1 });
visitorSchema.index({ path: 1, timestamp: -1 });
visitorSchema.index({ sessionId: 1 });

const Feature = mongoose.model('Feature', featureSchema);
const Example = mongoose.model('Example', exampleSchema);
const Stats = mongoose.model('Stats', statsSchema);
const Visitor = mongoose.model('Visitor', visitorSchema);

const wrapAsync =
  (fn) =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

let adminSecretWarningShown = false;

const requireAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!process.env.ADMIN_SECRET && !adminSecretWarningShown) {
    adminSecretWarningShown = true;
    console.warn('[api] ADMIN_SECRET is not configured');
  }

  if (!token || token !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

app.get(
  '/api/features',
  wrapAsync(async (req, res) => {
    const { category, active } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (active !== undefined) {
      query.active = active === 'true';
    }

    const features = await Feature.find(query).sort({ order: 1, createdAt: -1 });
    res.json(features);
  })
);

app.get(
  '/api/features/:id',
  wrapAsync(async (req, res) => {
    const feature = await Feature.findById(req.params.id);
    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    res.json(feature);
  })
);

app.post(
  '/api/features',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const feature = await Feature.create(req.body);
    res.status(201).json(feature);
  })
);

app.put(
  '/api/features/:id',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const feature = await Feature.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    res.json(feature);
  })
);

app.delete(
  '/api/features/:id',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const feature = await Feature.findByIdAndDelete(req.params.id);

    if (!feature) {
      return res.status(404).json({ error: 'Feature not found' });
    }

    res.json({ message: 'Feature deleted successfully' });
  })
);

app.post(
  '/api/features/reorder',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const { features } = req.body;

    if (!Array.isArray(features)) {
      return res
        .status(400)
        .json({ error: 'features must be an array of { id, order }' });
    }

    await Promise.all(
      features.map(({ id, order }) =>
        Feature.findByIdAndUpdate(id, { order }, { runValidators: true })
      )
    );

    res.json({ message: 'Features reordered successfully' });
  })
);

app.get(
  '/api/examples',
  wrapAsync(async (req, res) => {
    const { category, active } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (active !== undefined) {
      query.active = active === 'true';
    }

    const examples = await Example.find(query).sort({ order: 1, createdAt: -1 });
    res.json(examples);
  })
);

app.get(
  '/api/examples/:id',
  wrapAsync(async (req, res) => {
    const example = await Example.findById(req.params.id);
    if (!example) {
      return res.status(404).json({ error: 'Example not found' });
    }
    res.json(example);
  })
);

app.post(
  '/api/examples',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const example = await Example.create(req.body);
    res.status(201).json(example);
  })
);

app.put(
  '/api/examples/:id',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const example = await Example.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!example) {
      return res.status(404).json({ error: 'Example not found' });
    }

    res.json(example);
  })
);

app.delete(
  '/api/examples/:id',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const example = await Example.findByIdAndDelete(req.params.id);

    if (!example) {
      return res.status(404).json({ error: 'Example not found' });
    }

    res.json({ message: 'Example deleted successfully' });
  })
);

app.get(
  '/api/stats',
  wrapAsync(async (req, res) => {
    let stats = await Stats.findOne();

    if (!stats) {
      stats = await Stats.create({
        totalDownloads: 1500,
        githubStars: 250,
        activeUsers: 1000,
      });
    }

    res.json(stats);
  })
);

app.put(
  '/api/stats',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const updates = { ...req.body, lastUpdated: Date.now() };

    let stats = await Stats.findOne();

    if (!stats) {
      stats = await Stats.create(updates);
    } else {
      Object.assign(stats, updates);
      await stats.save();
    }

    res.json(stats);
  })
);

app.get(
  '/api/search',
  wrapAsync(async (req, res) => {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query parameter required' });
    }

    const matcher = new RegExp(q, 'i');

    const [features, examples] = await Promise.all([
      Feature.find({
        active: true,
        $or: [
          { title: matcher },
          { description: matcher },
          { category: matcher },
        ],
      }).limit(10),
      Example.find({
        active: true,
        $or: [{ title: matcher }, { description: matcher }],
      }).limit(10),
    ]);

    res.json({ features, examples });
  })
);

app.get(
  '/api/categories',
  wrapAsync(async (req, res) => {
    const categories = await Feature.distinct('category');
    res.json(categories);
  })
);

// Helper function to extract device info from user agent
const parseUserAgent = (userAgent) => {
  if (!userAgent) return { device: 'Unknown', browser: 'Unknown', os: 'Unknown' };
  
  const ua = userAgent.toLowerCase();
  let device = 'Desktop';
  let browser = 'Unknown';
  let os = 'Unknown';

  // Device detection
  if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    device = 'Mobile';
  } else if (/tablet|ipad|playbook|silk/i.test(ua)) {
    device = 'Tablet';
  }

  // Browser detection
  if (ua.includes('chrome') && !ua.includes('edg')) browser = 'Chrome';
  else if (ua.includes('firefox')) browser = 'Firefox';
  else if (ua.includes('safari') && !ua.includes('chrome')) browser = 'Safari';
  else if (ua.includes('edg')) browser = 'Edge';
  else if (ua.includes('opera') || ua.includes('opr')) browser = 'Opera';

  // OS detection
  if (ua.includes('windows')) os = 'Windows';
  else if (ua.includes('mac')) os = 'macOS';
  else if (ua.includes('linux')) os = 'Linux';
  else if (ua.includes('android')) os = 'Android';
  else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';

  return { device, browser, os };
};

// Track page view
app.post(
  '/api/analytics/pageview',
  express.raw({ type: '*/*' }),
  wrapAsync(async (req, res) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';
    const referer = req.headers.referer || '';
    
    // Handle both JSON and Blob (from sendBeacon) requests
    let body;
    try {
      if (Buffer.isBuffer(req.body)) {
        body = JSON.parse(req.body.toString());
      } else if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else {
        body = req.body;
      }
    } catch (e) {
      body = {};
    }
    
    const { path = '/', sessionId, visitDuration = 0 } = body || {};

    const { device, browser, os } = parseUserAgent(userAgent);

    // Get country from IP
    const cleanIp = ip.split(',')[0].trim(); // Handle multiple IPs from proxies
    const geo = geoip.lookup(cleanIp);
    const country = geo ? geo.country : 'Unknown';

    const visitor = await Visitor.create({
      ip: cleanIp,
      userAgent,
      referer,
      path,
      country,
      device,
      browser,
      os,
      sessionId: sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      visitDuration,
      timestamp: new Date(),
    });

    res.json({ message: 'Pageview tracked', id: visitor._id });
  })
);

// Get analytics summary
app.get(
  '/api/analytics/summary',
  requireAdmin,
  wrapAsync(async (_req, res) => {
    const [featureCount, exampleCount, stats] = await Promise.all([
      Feature.countDocuments({ active: true }),
      Example.countDocuments({ active: true }),
      Stats.findOne(),
    ]);

    res.json({
      features: featureCount,
      examples: exampleCount,
      downloads: stats?.totalDownloads || 0,
      stars: stats?.githubStars || 0,
      users: stats?.activeUsers || 0,
    });
  })
);

// Get visitor analytics
app.get(
  '/api/analytics/visitors',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const { startDate, endDate, limit = 100 } = req.query;
    const query = {};

    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const visitors = await Visitor.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .lean();

    res.json(visitors);
  })
);

// Get visitor statistics
app.get(
  '/api/analytics/visitor-stats',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const { days = 30 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const [
      totalVisits,
      uniqueVisitors,
      visitsByDay,
      visitsByPath,
      visitsByDevice,
      visitsByBrowser,
      visitsByOS,
      averageVisitDuration,
    ] = await Promise.all([
      Visitor.countDocuments({ timestamp: { $gte: startDate } }),
      Visitor.distinct('sessionId', { timestamp: { $gte: startDate } }),
      Visitor.aggregate([
        {
          $match: { timestamp: { $gte: startDate } },
        },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Visitor.aggregate([
        {
          $match: { timestamp: { $gte: startDate } },
        },
        {
          $group: {
            _id: '$path',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Visitor.aggregate([
        {
          $match: { timestamp: { $gte: startDate } },
        },
        {
          $group: {
            _id: '$device',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Visitor.aggregate([
        {
          $match: { timestamp: { $gte: startDate } },
        },
        {
          $group: {
            _id: '$browser',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Visitor.aggregate([
        {
          $match: { timestamp: { $gte: startDate } },
        },
        {
          $group: {
            _id: '$os',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
      Visitor.aggregate([
        {
          $match: { timestamp: { $gte: startDate } },
        },
        {
          $group: {
            _id: null,
            avgDuration: { $avg: '$visitDuration' },
          },
        },
      ]),
    ]);

    res.json({
      totalVisits,
      uniqueVisitors: uniqueVisitors.length,
      visitsByDay: visitsByDay.map((v) => ({ date: v._id, count: v.count })),
      visitsByPath: visitsByPath.map((v) => ({ path: v._id, count: v.count })),
      visitsByDevice: visitsByDevice.map((v) => ({ device: v._id, count: v.count })),
      visitsByBrowser: visitsByBrowser.map((v) => ({ browser: v._id, count: v.count })),
      visitsByOS: visitsByOS.map((v) => ({ os: v._id, count: v.count })),
      averageVisitDuration: averageVisitDuration[0]?.avgDuration || 0,
      period: { days: parseInt(days), startDate, endDate: new Date() },
    });
  })
);

// Delete visitor data
app.delete(
  '/api/analytics/visitors',
  requireAdmin,
  wrapAsync(async (req, res) => {
    const { olderThanDays } = req.query;

    let query = {};
    if (olderThanDays) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - parseInt(olderThanDays));
      query.timestamp = { $lt: cutoffDate };
    }

    const result = await Visitor.deleteMany(query);

    res.json({
      message: `Deleted ${result.deletedCount} visitor records`,
      deletedCount: result.deletedCount,
    });
  })
);

const defaultFeatureSeed = [
  {
    icon: 'sparkles',
    title: 'diff() - Smart Comparison',
    description: 'Compare two records and highlight only the changes.',
    category: 'Analysis',
    code: `const changes = await db.diff('users', 1, 2);
// => { name: { from: 'John', to: 'Jane' } }`,
    order: 1,
  },
  {
    icon: 'layers',
    title: 'bulkConditionalUpdate()',
    description: 'Update many records at once while respecting conditions.',
    category: 'Updates',
    code: `const rows = await db.bulkConditionalUpdate('users', [
  { where: { status: 'pending' }, data: { status: 'active' } },
  { where: { inactive_days: { $gt: 30 } }, data: { status: 'archived' } }
]);`,
    order: 2,
  },
  {
    icon: 'history',
    title: 'timeTravel()',
    description: 'Inspect how a record looked at any point in time.',
    category: 'History',
    code: `const snapshot = await db.timeTravel(
  'users',
  new Date('2024-01-01'),
  { id: 1 }
);`,
    order: 3,
  },
  {
    icon: 'git-merge',
    title: 'smartMerge()',
    description: 'Combine data from multiple tables with one call.',
    category: 'Data',
    code: `const profile = await db.smartMerge(
  ['users', 'profiles', 'preferences'],
  'user_id',
  123
);`,
    order: 4,
  },
  {
    icon: 'search',
    title: 'fuzzySearch()',
    description: 'Provide typo tolerant results with ranked relevance.',
    category: 'Search',
    code: `const results = await db.fuzzySearch(
  'products',
  'name',
  'iPhon',
  2
);`,
    order: 5,
  },
];

const defaultExampleSeed = [
  {
    title: 'E-Commerce Order Processing',
    description: 'Transaction that creates an order and adjusts stock counts.',
    code: `const orderId = await db.transaction(async () => {
  const order = await db.insertAndReturn('orders', {
    user_id: userId,
    total: 299.99,
    status: 'pending'
  });

  await db.bulkInsert('order_items', items);

  for (const item of items) {
    await db.decrement('products', item.id, 'stock', item.quantity);
  }

  return order.id;
});`,
    category: 'E-Commerce',
    order: 1,
  },
  {
    title: 'Advanced Search and Recommendations',
    description: 'Blend fuzzy search with weighted recommendations.',
    code: `const searchResults = await db.fuzzySearch(
  'products',
  'name',
  userQuery,
  2
);

const recommended = await db.weightedRandom(
  'products',
  'popularity_score',
  5,
  { status: 'active' }
);`,
    category: 'Search',
    order: 2,
  },
];

app.post(
  '/api/seed',
  wrapAsync(async (_req, res) => {
    const existingFeatures = await Feature.countDocuments();

    if (existingFeatures > 0) {
      return res.json({ message: 'Database already seeded' });
    }

    await Feature.insertMany(defaultFeatureSeed);
    await Example.insertMany(defaultExampleSeed);

    res.json({ message: 'Seed data created successfully' });
  })
);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'MySQL2 Helper Lite API',
    version: '1.0.0',
    endpoints: {
      features: '/api/features',
      examples: '/api/examples',
      stats: '/api/stats',
      search: '/api/search',
      categories: '/api/categories',
      analyticsSummary: '/api/analytics/summary',
      health: '/api/health',
    },
  });
});

app.use((err, _req, res, _next) => {
  console.error('[api] Unhandled error', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`[api] Server listening on http://localhost:${PORT}`);
});

module.exports = app;
