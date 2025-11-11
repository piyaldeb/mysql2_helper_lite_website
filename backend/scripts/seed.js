const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mysql2-helper-lite';

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

const Feature = mongoose.model('Feature', featureSchema);
const Example = mongoose.model('Example', exampleSchema);

const featureSeed = [
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

const exampleSeed = [
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

async function seed() {
  console.log('[seed] Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('[seed] Connected');

  const existing = await Feature.countDocuments();

  if (existing > 0) {
    console.log('[seed] Database already contains feature data. Aborting.');
    await mongoose.disconnect();
    return;
  }

  console.log('[seed] Inserting sample features and examples...');
  await Feature.insertMany(featureSeed);
  await Example.insertMany(exampleSeed);

  console.log('[seed] Completed successfully');
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error('[seed] Failed', error);
  await mongoose.disconnect();
  process.exit(1);
});
