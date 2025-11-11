// Complete catalog of all mysql2-helper-lite functions organized by category

export const allFunctions = [
  // Core Query Functions
  {
    id: 'query',
    icon: 'QR',
    title: 'query()',
    description: 'Execute raw SQL queries with optional caching',
    category: 'Core',
    code: `const rows = await db.query(
  'SELECT * FROM users WHERE status = ?',
  ['active'],
  true // enable cache
);`,
    order: 1,
  },
  {
    id: 'getOne',
    icon: 'GO',
    title: 'getOne()',
    description: 'Get a single row from query results',
    category: 'Core',
    code: `const user = await db.getOne(
  'SELECT * FROM users WHERE id = ?',
  [123]
);`,
    order: 2,
  },

  // Insert Operations
  {
    id: 'insert',
    icon: 'IN',
    title: 'insert()',
    description: 'Insert a single record and return the ID',
    category: 'Insert',
    code: `const userId = await db.insert('users', {
  name: 'John Doe',
  email: 'john@example.com',
  status: 'active'
});`,
    order: 3,
  },
  {
    id: 'insertAndReturn',
    icon: 'IR',
    title: 'insertAndReturn()',
    description: 'Insert a record and return the complete row',
    category: 'Insert',
    code: `const newUser = await db.insertAndReturn('users', {
  name: 'Jane Smith',
  email: 'jane@example.com'
});`,
    order: 4,
  },
  {
    id: 'bulkInsert',
    icon: 'BI',
    title: 'bulkInsert()',
    description: 'Insert multiple records at once for better performance',
    category: 'Insert',
    code: `const count = await db.bulkInsert('users', [
  { name: 'Alice', email: 'alice@example.com' },
  { name: 'Bob', email: 'bob@example.com' },
  { name: 'Charlie', email: 'charlie@example.com' }
]);`,
    order: 5,
  },
  {
    id: 'bulkInsertAndReturn',
    icon: 'BR',
    title: 'bulkInsertAndReturn()',
    description: 'Bulk insert and return all inserted records',
    category: 'Insert',
    code: `const users = await db.bulkInsertAndReturn('users', [
  { name: 'David', email: 'david@example.com' },
  { name: 'Eve', email: 'eve@example.com' }
]);`,
    order: 6,
  },
  {
    id: 'upsert',
    icon: 'UP',
    title: 'upsert()',
    description: 'Insert or update record if it already exists',
    category: 'Insert',
    code: `const result = await db.upsert('users', {
  id: 1,
  name: 'Updated Name',
  email: 'updated@example.com'
}, ['id']);`,
    order: 7,
  },
  {
    id: 'bulkUpsert',
    icon: 'BU',
    title: 'bulkUpsert()',
    description: 'Bulk upsert multiple records efficiently',
    category: 'Insert',
    code: `const count = await db.bulkUpsert('products', [
  { sku: 'PROD-001', name: 'Product 1', price: 29.99 },
  { sku: 'PROD-002', name: 'Product 2', price: 39.99 }
], ['sku']);`,
    order: 8,
  },

  // Update Operations
  {
    id: 'updateById',
    icon: 'UB',
    title: 'updateById()',
    description: 'Update a record by its ID',
    category: 'Update',
    code: `await db.updateById('users', 123, {
  status: 'inactive',
  last_login: new Date()
});`,
    order: 9,
  },
  {
    id: 'updateByIdAndReturn',
    icon: 'UR',
    title: 'updateByIdAndReturn()',
    description: 'Update by ID and return the updated record',
    category: 'Update',
    code: `const updated = await db.updateByIdAndReturn('users', 123, {
  name: 'New Name',
  email: 'newemail@example.com'
});`,
    order: 10,
  },
  {
    id: 'updateWhere',
    icon: 'UW',
    title: 'updateWhere()',
    description: 'Update all records matching conditions',
    category: 'Update',
    code: `const affected = await db.updateWhere(
  'users',
  { status: 'pending' },
  { status: 'active', verified: true }
);`,
    order: 11,
  },
  {
    id: 'batchUpdate',
    icon: 'BT',
    title: 'batchUpdate()',
    description: 'Update multiple records with different values in a transaction',
    category: 'Update',
    code: `const count = await db.batchUpdate('users', [
  { id: 1, name: 'User One' },
  { id: 2, name: 'User Two' },
  { id: 3, name: 'User Three' }
]);`,
    order: 12,
  },
  {
    id: 'increment',
    icon: 'IC',
    title: 'increment()',
    description: 'Increment a numeric field atomically',
    category: 'Update',
    code: `await db.increment('users', 123, 'login_count', 1);
// Increase login count by 1`,
    order: 13,
  },
  {
    id: 'decrement',
    icon: 'DC',
    title: 'decrement()',
    description: 'Decrement a numeric field atomically',
    category: 'Update',
    code: `await db.decrement('products', 456, 'stock', 5);
// Decrease stock by 5`,
    order: 14,
  },
  {
    id: 'incrementMany',
    icon: 'IM',
    title: 'incrementMany()',
    description: 'Increment multiple fields at once',
    category: 'Update',
    code: `await db.incrementMany('users', 123, {
  login_count: 1,
  points: 10,
  posts_count: 1
});`,
    order: 15,
  },
  {
    id: 'decrementMany',
    icon: 'DM',
    title: 'decrementMany()',
    description: 'Decrement multiple fields at once',
    category: 'Update',
    code: `await db.decrementMany('users', 123, {
  credits: 50,
  tokens: 10
});`,
    order: 16,
  },

  // Delete Operations
  {
    id: 'deleteById',
    icon: 'DB',
    title: 'deleteById()',
    description: 'Delete a record by ID (supports soft delete)',
    category: 'Delete',
    code: `// Hard delete
await db.deleteById('users', 123);

// Soft delete
await db.deleteById('users', 123, true);`,
    order: 17,
  },
  {
    id: 'deleteWhere',
    icon: 'DW',
    title: 'deleteWhere()',
    description: 'Delete all records matching conditions',
    category: 'Delete',
    code: `const count = await db.deleteWhere(
  'users',
  { status: 'inactive', last_login: null },
  false // hard delete
);`,
    order: 18,
  },
  {
    id: 'batchDelete',
    icon: 'BD',
    title: 'batchDelete()',
    description: 'Delete multiple records by IDs',
    category: 'Delete',
    code: `const count = await db.batchDelete(
  'users',
  [1, 2, 3, 4, 5],
  false // hard delete
);`,
    order: 19,
  },
  {
    id: 'truncate',
    icon: 'TR',
    title: 'truncate()',
    description: 'Remove all rows from a table (reset auto-increment)',
    category: 'Delete',
    code: `await db.truncate('logs');
// All logs deleted, ID counter reset`,
    order: 20,
  },
  {
    id: 'restore',
    icon: 'RS',
    title: 'restore()',
    description: 'Restore a soft-deleted record',
    category: 'Delete',
    code: `await db.restore('users', 123);
// Sets deleted_at to NULL`,
    order: 21,
  },
  {
    id: 'restoreWhere',
    icon: 'RW',
    title: 'restoreWhere()',
    description: 'Restore multiple soft-deleted records',
    category: 'Delete',
    code: `const count = await db.restoreWhere('users', {
  deleted_at: { operator: 'IS NOT NULL' }
});`,
    order: 22,
  },

  // Select & Find Operations
  {
    id: 'select',
    icon: 'SL',
    title: 'select()',
    description: 'Advanced select with filtering, ordering, grouping, and pagination',
    category: 'Select',
    code: `const users = await db.select('users', {
  columns: ['id', 'name', 'email'],
  where: { status: 'active' },
  orderBy: [{ column: 'created_at', direction: 'DESC' }],
  limit: 50,
  offset: 0
});`,
    order: 23,
  },
  {
    id: 'selectWhere',
    icon: 'SW',
    title: 'selectWhere()',
    description: 'Simple select with WHERE conditions',
    category: 'Select',
    code: `const activeUsers = await db.selectWhere('users', {
  status: 'active',
  verified: true
});`,
    order: 24,
  },
  {
    id: 'findOne',
    icon: 'FO',
    title: 'findOne()',
    description: 'Find a single record by conditions',
    category: 'Select',
    code: `const user = await db.findOne('users', {
  email: 'john@example.com'
});`,
    order: 25,
  },
  {
    id: 'findOrCreate',
    icon: 'FC',
    title: 'findOrCreate()',
    description: 'Find existing record or create new one',
    category: 'Select',
    code: `const { record, created } = await db.findOrCreate(
  'users',
  { email: 'new@example.com' },
  { name: 'New User', status: 'active' }
);`,
    order: 26,
  },
  {
    id: 'findOneAndUpdate',
    icon: 'FU',
    title: 'findOneAndUpdate()',
    description: 'Find and update a record in one operation',
    category: 'Select',
    code: `const user = await db.findOneAndUpdate(
  'users',
  { email: 'john@example.com' },
  { last_login: new Date() }
);`,
    order: 27,
  },
  {
    id: 'findOneAndDelete',
    icon: 'FD',
    title: 'findOneAndDelete()',
    description: 'Find and delete a record',
    category: 'Select',
    code: `const deleted = await db.findOneAndDelete(
  'sessions',
  { token: 'expired-token' }
);`,
    order: 28,
  },
  {
    id: 'getByIds',
    icon: 'GI',
    title: 'getByIds()',
    description: 'Get multiple records by their IDs',
    category: 'Select',
    code: `const users = await db.getByIds('users', [1, 2, 3, 4, 5]);`,
    order: 29,
  },
  {
    id: 'first',
    icon: 'FR',
    title: 'first()',
    description: 'Get the first record in the table',
    category: 'Select',
    code: `const firstUser = await db.first('users', 'created_at', 'ASC');`,
    order: 30,
  },
  {
    id: 'last',
    icon: 'LA',
    title: 'last()',
    description: 'Get the last record in the table',
    category: 'Select',
    code: `const latestPost = await db.last('posts', 'created_at');`,
    order: 31,
  },
  {
    id: 'random',
    icon: 'RD',
    title: 'random()',
    description: 'Get random record(s) from table',
    category: 'Select',
    code: `// Get one random user
const randomUser = await db.random('users', 1);

// Get 5 random users
const randomUsers = await db.random('users', 5);`,
    order: 32,
  },

  // Pagination
  {
    id: 'paginate',
    icon: 'PG',
    title: 'paginate()',
    description: 'Offset-based pagination with metadata',
    category: 'Pagination',
    code: `const result = await db.paginate('users', {
  page: 1,
  perPage: 20,
  where: { status: 'active' },
  orderBy: [{ column: 'name', direction: 'ASC' }]
});

// result.data, result.pagination (total, pages, hasNext, hasPrev)`,
    order: 33,
  },
  {
    id: 'cursorPaginate',
    icon: 'CP',
    title: 'cursorPaginate()',
    description: 'Cursor-based pagination for infinite scroll',
    category: 'Pagination',
    code: `const result = await db.cursorPaginate('posts', {
  cursor: lastPostId,
  limit: 20,
  cursorColumn: 'id',
  direction: 'DESC'
});

// result.data, result.nextCursor, result.hasMore`,
    order: 34,
  },
  {
    id: 'chunk',
    icon: 'CK',
    title: 'chunk()',
    description: 'Process large datasets in chunks',
    category: 'Pagination',
    code: `await db.chunk('users', 100, async (users, batchIndex) => {
  // Process each batch of 100 users
  for (const user of users) {
    await sendEmail(user.email);
  }
});`,
    order: 35,
  },

  // Aggregation & Statistics
  {
    id: 'count',
    icon: 'CT',
    title: 'count()',
    description: 'Count records matching conditions',
    category: 'Aggregation',
    code: `const activeCount = await db.count('users', {
  status: 'active'
});`,
    order: 36,
  },
  {
    id: 'countBy',
    icon: 'CB',
    title: 'countBy()',
    description: 'Count records grouped by a column',
    category: 'Aggregation',
    code: `const statusCounts = await db.countBy('users', 'status');
// [{ status: 'active', count: 150 }, { status: 'inactive', count: 50 }]`,
    order: 37,
  },
  {
    id: 'exists',
    icon: 'EX',
    title: 'exists()',
    description: 'Check if a record exists',
    category: 'Aggregation',
    code: `const userExists = await db.exists('users', {
  email: 'test@example.com'
});`,
    order: 38,
  },
  {
    id: 'aggregate',
    icon: 'AG',
    title: 'aggregate()',
    description: 'Perform multiple aggregation functions',
    category: 'Aggregation',
    code: `const stats = await db.aggregate('orders', {
  functions: [
    { func: 'SUM', column: 'total', alias: 'revenue' },
    { func: 'AVG', column: 'total', alias: 'avg_order' },
    { func: 'COUNT', column: '*', alias: 'total_orders' }
  ],
  where: { status: 'completed' }
});`,
    order: 39,
  },
  {
    id: 'min',
    icon: 'MN',
    title: 'min()',
    description: 'Find minimum value in a column',
    category: 'Aggregation',
    code: `const minPrice = await db.min('products', 'price', {
  status: 'active'
});`,
    order: 40,
  },
  {
    id: 'max',
    icon: 'MX',
    title: 'max()',
    description: 'Find maximum value in a column',
    category: 'Aggregation',
    code: `const maxPrice = await db.max('products', 'price');`,
    order: 41,
  },
  {
    id: 'avg',
    icon: 'AV',
    title: 'avg()',
    description: 'Calculate average of a column',
    category: 'Aggregation',
    code: `const avgRating = await db.avg('reviews', 'rating', {
  product_id: 123
});`,
    order: 42,
  },
  {
    id: 'sum',
    icon: 'SM',
    title: 'sum()',
    description: 'Calculate sum of a column',
    category: 'Aggregation',
    code: `const totalRevenue = await db.sum('orders', 'total', {
  status: 'completed'
});`,
    order: 43,
  },
  {
    id: 'median',
    icon: 'MD',
    title: 'median()',
    description: 'Calculate median value (MySQL 8.0+)',
    category: 'Aggregation',
    code: `const medianAge = await db.median('users', 'age', {
  status: 'active'
});`,
    order: 44,
  },
  {
    id: 'percentile',
    icon: 'PC',
    title: 'percentile()',
    description: 'Calculate percentile value',
    category: 'Aggregation',
    code: `const p95ResponseTime = await db.percentile(
  'requests',
  'response_time',
  95
);`,
    order: 45,
  },
  {
    id: 'distinctValues',
    icon: 'DV',
    title: 'distinctValues()',
    description: 'Get distinct values from a column',
    category: 'Aggregation',
    code: `const statuses = await db.distinctValues('users', 'status');`,
    order: 46,
  },
  {
    id: 'pluck',
    icon: 'PK',
    title: 'pluck()',
    description: 'Extract a single column as an array',
    category: 'Aggregation',
    code: `const userIds = await db.pluck('users', 'id', {
  status: 'active'
});
// [1, 2, 3, 4, 5]`,
    order: 47,
  },
  {
    id: 'groupConcat',
    icon: 'GC',
    title: 'groupConcat()',
    description: 'Concatenate column values grouped by another column',
    category: 'Aggregation',
    code: `const tagsByPost = await db.groupConcat(
  'post_tags',
  'tag_name',
  'post_id',
  {},
  ', '
);`,
    order: 48,
  },

  // Advanced Search
  {
    id: 'search',
    icon: 'SR',
    title: 'search()',
    description: 'Simple keyword search across multiple fields',
    category: 'Search',
    code: `const results = await db.search(
  'products',
  ['name', 'description', 'sku'],
  'laptop'
);`,
    order: 49,
  },
  {
    id: 'advancedSearch',
    icon: 'AS',
    title: 'advancedSearch()',
    description: 'Advanced search with operators (LIKE, IN, BETWEEN, etc)',
    category: 'Search',
    code: `const results = await db.advancedSearch('products', {
  price: { operator: 'BETWEEN', value: { min: 100, max: 500 } },
  category: { operator: 'IN', value: ['Electronics', 'Computers'] },
  name: { operator: 'LIKE', value: 'laptop' }
});`,
    order: 50,
  },
  {
    id: 'fullTextSearch',
    icon: 'FT',
    title: 'fullTextSearch()',
    description: 'Full-text search with relevance scoring',
    category: 'Search',
    code: `const results = await db.fullTextSearch(
  'articles',
  ['title', 'content'],
  'mysql performance',
  { mode: 'NATURAL LANGUAGE', minScore: 0.5 }
);`,
    order: 51,
  },
  {
    id: 'fuzzySearch',
    icon: 'FZ',
    title: 'fuzzySearch()',
    description: 'Find approximate matches with scoring',
    category: 'Search',
    code: `const results = await db.fuzzySearch(
  'products',
  'name',
  'laptp', // typo
  3 // max score
);`,
    order: 52,
  },

  // WHERE Conditions
  {
    id: 'whereIn',
    icon: 'WI',
    title: 'whereIn()',
    description: 'Select records where column is in array',
    category: 'Where',
    code: `const users = await db.whereIn('users', 'id', [1, 2, 3, 4, 5]);`,
    order: 53,
  },
  {
    id: 'whereNotIn',
    icon: 'WN',
    title: 'whereNotIn()',
    description: 'Select records where column is NOT in array',
    category: 'Where',
    code: `const users = await db.whereNotIn('users', 'status', ['banned', 'deleted']);`,
    order: 54,
  },
  {
    id: 'whereBetween',
    icon: 'WB',
    title: 'whereBetween()',
    description: 'Select records where column is between two values',
    category: 'Where',
    code: `const products = await db.whereBetween('products', 'price', 50, 200);`,
    order: 55,
  },
  {
    id: 'whereNotBetween',
    icon: 'WX',
    title: 'whereNotBetween()',
    description: 'Select records where column is NOT between values',
    category: 'Where',
    code: `const outliers = await db.whereNotBetween('scores', 'value', 20, 80);`,
    order: 56,
  },
  {
    id: 'whereNull',
    icon: 'WL',
    title: 'whereNull()',
    description: 'Select records where column is NULL',
    category: 'Where',
    code: `const incomplete = await db.whereNull('users', 'email_verified_at');`,
    order: 57,
  },
  {
    id: 'whereNotNull',
    icon: 'WK',
    title: 'whereNotNull()',
    description: 'Select records where column is NOT NULL',
    category: 'Where',
    code: `const verified = await db.whereNotNull('users', 'email_verified_at');`,
    order: 58,
  },
  {
    id: 'whereGreaterThan',
    icon: 'WG',
    title: 'whereGreaterThan()',
    description: 'Select records where column > value',
    category: 'Where',
    code: `const highScores = await db.whereGreaterThan('scores', 'points', 1000);`,
    order: 59,
  },
  {
    id: 'whereLessThan',
    icon: 'WT',
    title: 'whereLessThan()',
    description: 'Select records where column < value',
    category: 'Where',
    code: `const lowStock = await db.whereLessThan('products', 'stock', 10);`,
    order: 60,
  },
  {
    id: 'whereStartsWith',
    icon: 'WS',
    title: 'whereStartsWith()',
    description: 'Select records where column starts with value',
    category: 'Where',
    code: `const admins = await db.whereStartsWith('users', 'email', 'admin@');`,
    order: 61,
  },
  {
    id: 'whereEndsWith',
    icon: 'WE',
    title: 'whereEndsWith()',
    description: 'Select records where column ends with value',
    category: 'Where',
    code: `const gmailUsers = await db.whereEndsWith('users', 'email', '@gmail.com');`,
    order: 62,
  },
  {
    id: 'whereContains',
    icon: 'WC',
    title: 'whereContains()',
    description: 'Select records where column contains value',
    category: 'Where',
    code: `const searchResults = await db.whereContains('posts', 'title', 'MySQL');`,
    order: 63,
  },
  {
    id: 'whereLike',
    icon: 'WK',
    title: 'whereLike()',
    description: 'Select records with LIKE pattern',
    category: 'Where',
    code: `const results = await db.whereLike('products', 'name', 'laptop', false);`,
    order: 64,
  },

  // Date Queries
  {
    id: 'whereDateBetween',
    icon: 'DT',
    title: 'whereDateBetween()',
    description: 'Select records where date is between two dates',
    category: 'Date',
    code: `const orders = await db.whereDateBetween(
  'orders',
  'created_at',
  '2024-01-01',
  '2024-12-31'
);`,
    order: 65,
  },
  {
    id: 'whereDate',
    icon: 'WD',
    title: 'whereDate()',
    description: 'Select records for a specific date',
    category: 'Date',
    code: `const todayOrders = await db.whereDate(
  'orders',
  'created_at',
  '2024-01-15',
  '='
);`,
    order: 66,
  },
  {
    id: 'whereYear',
    icon: 'WY',
    title: 'whereYear()',
    description: 'Select records for a specific year',
    category: 'Date',
    code: `const orders2024 = await db.whereYear('orders', 'created_at', 2024);`,
    order: 67,
  },
  {
    id: 'whereMonth',
    icon: 'WM',
    title: 'whereMonth()',
    description: 'Select records for a specific month',
    category: 'Date',
    code: `const januaryOrders = await db.whereMonth('orders', 'created_at', 1);`,
    order: 68,
  },
  {
    id: 'whereDay',
    icon: 'WA',
    title: 'whereDay()',
    description: 'Select records for a specific day of month',
    category: 'Date',
    code: `const firstDayOrders = await db.whereDay('orders', 'created_at', 1);`,
    order: 69,
  },
  {
    id: 'createdToday',
    icon: 'TD',
    title: 'createdToday()',
    description: 'Select records created today',
    category: 'Date',
    code: `const todayUsers = await db.createdToday('users');`,
    order: 70,
  },
  {
    id: 'createdThisWeek',
    icon: 'TW',
    title: 'createdThisWeek()',
    description: 'Select records created this week',
    category: 'Date',
    code: `const weekUsers = await db.createdThisWeek('users');`,
    order: 71,
  },
  {
    id: 'createdThisMonth',
    icon: 'TM',
    title: 'createdThisMonth()',
    description: 'Select records created this month',
    category: 'Date',
    code: `const monthUsers = await db.createdThisMonth('users');`,
    order: 72,
  },
  {
    id: 'createdThisYear',
    icon: 'TY',
    title: 'createdThisYear()',
    description: 'Select records created this year',
    category: 'Date',
    code: `const yearUsers = await db.createdThisYear('users');`,
    order: 73,
  },

  // Soft Deletes
  {
    id: 'withTrashed',
    icon: 'TH',
    title: 'withTrashed()',
    description: 'Include soft-deleted records in results',
    category: 'Soft Delete',
    code: `const allUsers = await db.withTrashed('users', { role: 'admin' });`,
    order: 74,
  },
  {
    id: 'onlyTrashed',
    icon: 'OT',
    title: 'onlyTrashed()',
    description: 'Get only soft-deleted records',
    category: 'Soft Delete',
    code: `const deleted = await db.onlyTrashed('users');`,
    order: 75,
  },

  // JSON Operations
  {
    id: 'jsonExtract',
    icon: 'JE',
    title: 'jsonExtract()',
    description: 'Extract values from JSON columns',
    category: 'JSON',
    code: `const emails = await db.jsonExtract(
  'users',
  'metadata',
  '$.preferences.email'
);`,
    order: 76,
  },
  {
    id: 'jsonContains',
    icon: 'JC',
    title: 'jsonContains()',
    description: 'Find records where JSON contains value',
    category: 'JSON',
    code: `const users = await db.jsonContains(
  'users',
  'preferences',
  { theme: 'dark' }
);`,
    order: 77,
  },

  // Relationships & Joins
  {
    id: 'join',
    icon: 'JN',
    title: 'join()',
    description: 'Perform table joins',
    category: 'Relations',
    code: `const result = await db.join({
  baseTable: 'users',
  joinTable: 'profiles',
  baseKey: 'id',
  joinKey: 'user_id',
  joinType: 'INNER'
});`,
    order: 78,
  },
  {
    id: 'multiJoin',
    icon: 'MJ',
    title: 'multiJoin()',
    description: 'Join multiple tables at once',
    category: 'Relations',
    code: `const result = await db.multiJoin({
  baseTable: 'orders',
  joins: [
    { table: 'users', baseColumn: 'user_id', joinColumn: 'id', type: 'INNER' },
    { table: 'products', baseColumn: 'product_id', joinColumn: 'id', type: 'LEFT' }
  ]
});`,
    order: 79,
  },
  {
    id: 'hasOne',
    icon: 'HO',
    title: 'hasOne()',
    description: 'Get related record (one-to-one)',
    category: 'Relations',
    code: `const profile = await db.hasOne('users', 'profiles', userId, 'user_id');`,
    order: 80,
  },
  {
    id: 'hasMany',
    icon: 'HM',
    title: 'hasMany()',
    description: 'Get related records (one-to-many)',
    category: 'Relations',
    code: `const posts = await db.hasMany('users', 'posts', userId, 'user_id');`,
    order: 81,
  },
  {
    id: 'belongsTo',
    icon: 'BT',
    title: 'belongsTo()',
    description: 'Get parent record (inverse of hasMany)',
    category: 'Relations',
    code: `const user = await db.belongsTo('posts', 'users', post.user_id, 'id');`,
    order: 82,
  },
  {
    id: 'belongsToMany',
    icon: 'BM',
    title: 'belongsToMany()',
    description: 'Get many-to-many relationships via pivot table',
    category: 'Relations',
    code: `const tags = await db.belongsToMany(
  'posts',
  'tags',
  'post_tags',
  postId
);`,
    order: 83,
  },

  // Advanced Features
  {
    id: 'pivotTable',
    icon: 'PV',
    title: 'pivotTable()',
    description: 'Create pivot tables for data analysis',
    category: 'Analytics',
    code: `const pivot = await db.pivotTable(
  'sales',
  ['product_name'],
  'month',
  'revenue',
  { aggregate: 'SUM', includeTotals: true }
);`,
    order: 84,
  },
  {
    id: 'rank',
    icon: 'RK',
    title: 'rank()',
    description: 'Rank records with tie handling',
    category: 'Analytics',
    code: `const ranked = await db.rank('users', 'score', {
  orderDirection: 'DESC',
  partitionBy: 'country'
});`,
    order: 85,
  },
  {
    id: 'movingAverage',
    icon: 'MA',
    title: 'movingAverage()',
    description: 'Calculate moving average for time series',
    category: 'Analytics',
    code: `const ma = await db.movingAverage(
  'metrics',
  'value',
  'date',
  7 // 7-day window
);`,
    order: 86,
  },
  {
    id: 'diff',
    icon: 'DF',
    title: 'diff()',
    description: 'Compare two records and show differences',
    category: 'Utilities',
    code: `const changes = await db.diff('users', 1, 2);
// { name: { from: 'John', to: 'Jane' }, ... }`,
    order: 87,
  },
  {
    id: 'clone',
    icon: 'CL',
    title: 'clone()',
    description: 'Clone a record with optional overrides',
    category: 'Utilities',
    code: `const cloned = await db.clone('products', 123, {
  name: 'Product Copy',
  sku: 'NEW-SKU'
});`,
    order: 88,
  },
  {
    id: 'isDuplicate',
    icon: 'ID',
    title: 'isDuplicate()',
    description: 'Check if a record would be a duplicate',
    category: 'Utilities',
    code: `const isDupe = await db.isDuplicate(
  'users',
  { email: 'test@example.com' },
  currentUserId
);`,
    order: 89,
  },
  {
    id: 'findDuplicates',
    icon: 'FP',
    title: 'findDuplicates()',
    description: 'Find duplicate records by fields',
    category: 'Utilities',
    code: `const dupes = await db.findDuplicates('users', ['email', 'phone']);`,
    order: 90,
  },
  {
    id: 'weightedRandom',
    icon: 'WR',
    title: 'weightedRandom()',
    description: 'Get random records with weighted probability',
    category: 'Utilities',
    code: `const ad = await db.weightedRandom('ads', 'priority', 1);`,
    order: 91,
  },
  {
    id: 'batchTransform',
    icon: 'TX',
    title: 'batchTransform()',
    description: 'Transform all records with a function',
    category: 'Utilities',
    code: `const count = await db.batchTransform('users', async (user) => {
  return { ...user, name: user.name.toUpperCase() };
}, {}, 100);`,
    order: 92,
  },
  {
    id: 'bulkConditionalUpdate',
    icon: 'BC',
    title: 'bulkConditionalUpdate()',
    description: 'Update multiple records with different conditions',
    category: 'Utilities',
    code: `const count = await db.bulkConditionalUpdate('users', [
  { where: { status: 'pending' }, data: { status: 'active' } },
  { where: { last_login: null }, data: { status: 'inactive' } }
]);`,
    order: 93,
  },
  {
    id: 'timeTravel',
    icon: 'TT',
    title: 'timeTravel()',
    description: 'Query records as they were at a timestamp',
    category: 'Utilities',
    code: `const pastData = await db.timeTravel(
  'users',
  '2024-01-01 00:00:00',
  { id: 123 }
);`,
    order: 94,
  },
  {
    id: 'smartMerge',
    icon: 'ME',
    title: 'smartMerge()',
    description: 'Merge data from multiple tables',
    category: 'Utilities',
    code: `const merged = await db.smartMerge(
  ['users', 'profiles', 'settings'],
  'user_id',
  123
);`,
    order: 95,
  },
  {
    id: 'conditionalAggregate',
    icon: 'CA',
    title: 'conditionalAggregate()',
    description: 'Aggregate with conditional logic',
    category: 'Analytics',
    code: `const stats = await db.conditionalAggregate('orders', [
  { func: 'SUM', column: 'total', condition: 'status = "completed"', alias: 'revenue' },
  { func: 'COUNT', column: 'id', condition: 'status = "pending"', alias: 'pending_count' }
]);`,
    order: 96,
  },

  // Transactions & Database Management
  {
    id: 'transaction',
    icon: 'TS',
    title: 'transaction()',
    description: 'Execute multiple operations in a transaction',
    category: 'Transaction',
    code: `const result = await db.transaction(async (conn) => {
  await db.insert('orders', { user_id: 123, total: 99.99 });
  await db.decrement('products', 1, 'stock', 1);
  return 'success';
});`,
    order: 97,
  },
  {
    id: 'snapshot',
    icon: 'SN',
    title: 'snapshot()',
    description: 'Create a backup snapshot of a table',
    category: 'Database',
    code: `const snap = await db.snapshot('users', 'users_backup_2024');`,
    order: 98,
  },
  {
    id: 'createVersion',
    icon: 'CV',
    title: 'createVersion()',
    description: 'Create a version history entry',
    category: 'Database',
    code: `await db.createVersion('users', 123, currentUserId);`,
    order: 99,
  },
  {
    id: 'cascadeUpdate',
    icon: 'CU',
    title: 'cascadeUpdate()',
    description: 'Update record and all related records',
    category: 'Database',
    code: `await db.cascadeUpdate('users', 123,
  { status: 'inactive' },
  [{ table: 'posts', foreignKey: 'user_id', data: { visible: false } }]
);`,
    order: 100,
  },

  // Cache & Performance
  {
    id: 'clearCache',
    icon: 'CC',
    title: 'clearCache()',
    description: 'Clear query cache for table or all',
    category: 'Cache',
    code: `db.clearCache('users'); // Clear specific table
db.clearCache(); // Clear all cache`,
    order: 101,
  },
  {
    id: 'getCacheStats',
    icon: 'CS',
    title: 'getCacheStats()',
    description: 'Get cache statistics',
    category: 'Cache',
    code: `const stats = db.getCacheStats();
// { size: 42, enabled: true, expiry: 60000 }`,
    order: 102,
  },
  {
    id: 'warmCache',
    icon: 'WM',
    title: 'warmCache()',
    description: 'Pre-load frequently accessed data',
    category: 'Cache',
    code: `const result = await db.warmCache('users', [
  { where: { status: 'active' } },
  { where: { role: 'admin' } }
]);`,
    order: 103,
  },

  // Hooks
  {
    id: 'addHook',
    icon: 'AH',
    title: 'addHook()',
    description: 'Add before/after hooks for operations',
    category: 'Hooks',
    code: `db.addHook('before', 'insert', async (data) => {
  console.log('About to insert:', data);
  return data;
});`,
    order: 104,
  },
  {
    id: 'removeHook',
    icon: 'RH',
    title: 'removeHook()',
    description: 'Remove a registered hook',
    category: 'Hooks',
    code: `db.removeHook('before', 'insert');`,
    order: 105,
  },

  // Schema & Metadata
  {
    id: 'getTableSchema',
    icon: 'GS',
    title: 'getTableSchema()',
    description: 'Get table structure information',
    category: 'Schema',
    code: `const schema = await db.getTableSchema('users');`,
    order: 106,
  },
  {
    id: 'getTableIndexes',
    icon: 'GX',
    title: 'getTableIndexes()',
    description: 'Get table indexes',
    category: 'Schema',
    code: `const indexes = await db.getTableIndexes('users');`,
    order: 107,
  },
  {
    id: 'getTableInfo',
    icon: 'GT',
    title: 'getTableInfo()',
    description: 'Get table metadata (size, rows, etc)',
    category: 'Schema',
    code: `const info = await db.getTableInfo('users');
// { table_name, table_rows, size_mb, ... }`,
    order: 108,
  },
  {
    id: 'listTables',
    icon: 'LT',
    title: 'listTables()',
    description: 'List all tables in database',
    category: 'Schema',
    code: `const tables = await db.listTables();`,
    order: 109,
  },
  {
    id: 'tableExists',
    icon: 'TE',
    title: 'tableExists()',
    description: 'Check if a table exists',
    category: 'Schema',
    code: `const exists = await db.tableExists('users');`,
    order: 110,
  },
  {
    id: 'optimizeTable',
    icon: 'OP',
    title: 'optimizeTable()',
    description: 'Optimize table for better performance',
    category: 'Schema',
    code: `await db.optimizeTable('users');`,
    order: 111,
  },
  {
    id: 'analyzeTable',
    icon: 'AN',
    title: 'analyzeTable()',
    description: 'Analyze table statistics',
    category: 'Schema',
    code: `await db.analyzeTable('users');`,
    order: 112,
  },

  // Raw Queries & Health
  {
    id: 'raw',
    icon: 'RW',
    title: 'raw()',
    description: 'Execute raw SQL (with safety checks)',
    category: 'Raw',
    code: `const results = await db.raw(
  'SELECT * FROM users WHERE age > ?',
  [18]
);`,
    order: 113,
  },
  {
    id: 'rawUnsafe',
    icon: 'RU',
    title: 'rawUnsafe()',
    description: 'Execute raw SQL (no safety checks)',
    category: 'Raw',
    code: `const results = await db.rawUnsafe(
  'DROP TABLE IF EXISTS temp_table'
);`,
    order: 114,
  },
  {
    id: 'healthCheck',
    icon: 'HC',
    title: 'healthCheck()',
    description: 'Check database connection health',
    category: 'Monitoring',
    code: `const health = await db.healthCheck();
// { status: 'healthy', timestamp: ... }`,
    order: 115,
  },
  {
    id: 'getDatabaseStats',
    icon: 'DS',
    title: 'getDatabaseStats()',
    description: 'Get overall database statistics',
    category: 'Monitoring',
    code: `const stats = await db.getDatabaseStats();
// { table_count, total_rows, total_size_mb }`,
    order: 116,
  },
  {
    id: 'getPoolInfo',
    icon: 'PI',
    title: 'getPoolInfo()',
    description: 'Get connection pool information',
    category: 'Monitoring',
    code: `const poolInfo = db.getPoolInfo();
// { totalConnections, activeConnections, freeConnections, queueLength }`,
    order: 117,
  },
  {
    id: 'queryStats',
    icon: 'QS',
    title: 'queryStats()',
    description: 'Analyze query performance patterns',
    category: 'Monitoring',
    code: `const stats = await db.queryStats('users', { days: 7 });`,
    order: 118,
  },
  {
    id: 'logAudit',
    icon: 'LA',
    title: 'logAudit()',
    description: 'Log audit trail for actions',
    category: 'Monitoring',
    code: `await db.logAudit('UPDATE', 'users', { id: 123 }, currentUserId);`,
    order: 119,
  },
];

// Categories for filtering
export const categories = [
  'All',
  'Core',
  'Insert',
  'Update',
  'Delete',
  'Select',
  'Pagination',
  'Aggregation',
  'Search',
  'Where',
  'Date',
  'Soft Delete',
  'JSON',
  'Relations',
  'Analytics',
  'Utilities',
  'Transaction',
  'Database',
  'Cache',
  'Hooks',
  'Schema',
  'Raw',
  'Monitoring',
];
