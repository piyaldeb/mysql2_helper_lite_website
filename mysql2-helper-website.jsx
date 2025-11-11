import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Database, Shield, Sparkles, Star, Users, Zap } from 'lucide-react';

const API_URL =
  (typeof window !== 'undefined' && window.__MYSQL2_HELPER_API_URL__) ||
  process.env.REACT_APP_API_URL ||
  (typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.VITE_API_URL) ||
  'http://localhost:3001/api';

const styles = `
  :root {
    color-scheme: light;
  }

  .mh-root {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    color: #0f172a;
    background-color: #f8fafc;
    line-height: 1.6;
  }

  .mh-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .mh-pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 9999px;
    background: rgba(148, 163, 184, 0.15);
    padding: 0.4rem 0.9rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: #e2e8f0;
  }

  .mh-hero {
    position: relative;
    overflow: hidden;
    padding: 4.5rem 0 5rem;
    background: radial-gradient(circle at top left, rgba(59, 130, 246, 0.45), transparent 45%),
      radial-gradient(circle at top right, rgba(14, 165, 233, 0.45), transparent 40%),
      linear-gradient(135deg, #0f172a, #1e293b 65%, #1e293b);
    color: #f8fafc;
  }

  .mh-hero h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    line-height: 1.1;
    margin-bottom: 1rem;
  }

  .mh-hero p {
    max-width: 640px;
    color: rgba(226, 232, 240, 0.85);
    margin-bottom: 2rem;
  }

  .mh-highlight-grid {
    display: grid;
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  @media (min-width: 640px) {
    .mh-highlight-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .mh-highlight {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: rgba(15, 23, 42, 0.5);
    border-radius: 0.9rem;
    padding: 0.9rem 1.2rem;
    font-size: 0.95rem;
  }

  .mh-highlight svg {
    flex-shrink: 0;
    color: #38bdf8;
  }

  .mh-cta-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2.5rem;
  }

  .mh-btn-primary,
  .mh-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 9999px;
    padding: 0.75rem 1.3rem;
    font-weight: 600;
    transition: transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease, color 0.15s ease;
  }

  .mh-btn-primary {
    background: #f8fafc;
    color: #0f172a;
    box-shadow: 0 18px 35px rgba(15, 23, 42, 0.25);
  }

  .mh-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 22px 45px rgba(15, 23, 42, 0.28);
  }

  .mh-btn-secondary {
    border: 1px solid rgba(248, 250, 252, 0.4);
    color: #f8fafc;
  }

  .mh-btn-secondary:hover {
    background: rgba(248, 250, 252, 0.15);
  }

  .mh-content {
    padding: 4.5rem 0;
  }

  .mh-section {
    margin-bottom: 5rem;
  }

  .mh-eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.18rem;
    font-weight: 700;
    font-size: 0.75rem;
    color: #2563eb;
    margin-bottom: 0.75rem;
  }

  .mh-section-title {
    text-align: center;
    margin-bottom: 2.75rem;
  }

  .mh-section-title h2 {
    font-size: clamp(2rem, 4vw, 2.8rem);
    margin-bottom: 0.75rem;
    color: #0f172a;
  }

  .mh-section-title p {
    color: #475569;
    max-width: 700px;
    margin: 0 auto;
  }

  .mh-grid {
    display: grid;
    gap: 1.75rem;
  }

  @media (min-width: 768px) {
    .mh-grid-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .mh-grid-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .mh-card {
    background: #ffffff;
    border-radius: 1.1rem;
    border: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: 0 10px 35px rgba(15, 23, 42, 0.06);
    padding: 1.9rem;
  }

  .mh-card h3 {
    margin: 0;
    font-size: 1.25rem;
    color: #0f172a;
  }

  .mh-card pre {
    margin-top: 1.25rem;
    border-radius: 0.9rem;
    background: #0f172a;
    color: #f8fafc;
    padding: 1.1rem;
    font-size: 0.88rem;
    overflow-x: auto;
  }

  .mh-feature-header {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    margin-bottom: 1rem;
  }

  .mh-feature-icon {
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(14, 165, 233, 0.15));
    display: grid;
    place-items: center;
    font-weight: 700;
    color: #2563eb;
    text-transform: uppercase;
  }

  .mh-feature-meta {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.08rem;
    color: #1d4ed8;
  }

  .mh-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .mh-tab {
    border-radius: 9999px;
    border: 1px solid rgba(15, 23, 42, 0.1);
    background: #ffffff;
    padding: 0.55rem 1.3rem;
    font-size: 0.92rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .mh-tab-active {
    background: #0f172a;
    color: #f8fafc;
    border-color: #0f172a;
  }

  .mh-stats {
    background: linear-gradient(145deg, rgba(59, 130, 246, 0.08), rgba(6, 182, 212, 0.08));
    border-radius: 1.5rem;
    padding: 2rem;
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .mh-stats {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  .mh-stat-card {
    background: rgba(248, 250, 252, 0.75);
    border-radius: 1.05rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border: 1px solid rgba(15, 23, 42, 0.08);
  }

  .mh-stat-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.9rem;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(14, 165, 233, 0.18));
    display: grid;
    place-items: center;
    color: #1d4ed8;
  }

  .mh-footer {
    background: #ffffff;
    border-top: 1px solid rgba(15, 23, 42, 0.08);
    padding: 2.5rem 0;
  }

  .mh-footer-inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    color: #475569;
  }

  @media (min-width: 640px) {
    .mh-footer-inner {
      flex-direction: row;
    }
  }

  .mh-footer-links {
    display: flex;
    gap: 1.2rem;
  }

  .mh-footer-links a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
  }

  .mh-footer-links a:hover {
    color: #0f172a;
  }

  .mh-alert {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.85rem;
    color: #b45309;
    background: rgba(251, 191, 36, 0.12);
    border: 1px solid rgba(217, 119, 6, 0.25);
    border-radius: 0.75rem;
    padding: 0.9rem 1rem;
  }
`;

const heroHighlights = [
  { icon: <Zap size={18} />, label: 'High velocity SQL helpers' },
  { icon: <Sparkles size={18} />, label: 'Typed, production ready patterns' },
  { icon: <Shield size={18} />, label: 'Safe defaults and guardrails' },
];

const fallbackData = {
  features: [
    {
      id: '1',
      icon: 'SP',
      title: 'diff() - Smart Comparison',
      description: 'Compare two records and highlight only the changes.',
      category: 'Analysis',
      code: `const changes = await db.diff('users', 1, 2);
// => { name: { from: 'John', to: 'Jane' } }`,
      order: 1,
    },
    {
      id: '2',
      icon: 'LC',
      title: 'bulkConditionalUpdate()',
      description: 'Update many records at once while respecting conditions.',
      category: 'Updates',
      code: `const rows = await db.bulkConditionalUpdate('users', [
  { where: { status: 'pending' }, data: { status: 'active' } },
  { where: { inactive_days: { $gt: 30 } }, data: { status: 'archived' } }
]);`,
      order: 2,
    },
  ],
  examples: [
    {
      id: '1',
      title: 'E-Commerce Order Processing',
      description: 'Create orders, add line items, and adjust inventory in a single transaction.',
      category: 'E-Commerce',
      code: `const orderId = await db.transaction(async () => {
  const order = await db.insertAndReturn('orders', {
    user_id: userId,
    total: 299.99,
    status: 'pending'
  });

  await db.bulkInsert('order_items', items);
  await db.decrement('products', item.id, 'stock', item.quantity);
  return order.id;
});`,
      order: 1,
    },
  ],
};

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mh-section-title">
      {eyebrow ? <p className="mh-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function FeatureCard({ feature }) {
  return (
    <article className="mh-card">
      <div className="mh-feature-header">
        <span className="mh-feature-icon">{feature.icon?.slice(0, 2).toUpperCase()}</span>
        <div>
          <div className="mh-feature-meta">{feature.category}</div>
          <h3>{feature.title}</h3>
        </div>
      </div>
      <p>{feature.description}</p>
      <pre>
        <code>{feature.code}</code>
      </pre>
    </article>
  );
}

function ExampleCard({ example }) {
  return (
    <article className="mh-card">
      <div className="mh-feature-meta">{example.category}</div>
      <h3>{example.title}</h3>
      <p>{example.description}</p>
      <pre>
        <code>{example.code}</code>
      </pre>
    </article>
  );
}

function StatsBar({ stats }) {
  const fallback = {
    totalDownloads: 1500,
    githubStars: 250,
    activeUsers: 1000,
  };

  const values = stats ?? fallback;

  const items = [
    {
      icon: <Database size={20} />,
      label: 'Downloads',
      value: values.totalDownloads.toLocaleString(),
    },
    {
      icon: <Star size={20} />,
      label: 'GitHub stars',
      value: values.githubStars.toLocaleString(),
    },
    {
      icon: <Users size={20} />,
      label: 'Active teams',
      value: values.activeUsers.toLocaleString(),
    },
  ];

  return (
    <div className="mh-stats">
      {items.map((item) => (
        <div key={item.label} className="mh-stat-card">
          <span className="mh-stat-icon">{item.icon}</span>
          <div>
            <p style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700 }}>{item.value}</p>
            <p style={{ margin: 0, color: '#475569', fontSize: '0.95rem' }}>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function IntegrationSteps() {
  const steps = [
    {
      title: 'Install',
      description: 'Add the helper to your project and create a connection pool.',
      code: `npm install mysql2-helper-lite`,
    },
    {
      title: 'Configure',
      description: 'Set up your database credentials and default helper options.',
      code: `import { createHelper } from 'mysql2-helper-lite';

const db = createHelper({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});`,
    },
    {
      title: 'Ship',
      description: 'Replace repetitive SQL with expressive helper calls.',
      code: `const users = await db.cachedQuery(
  'SELECT * FROM users WHERE status = ?',
  ['active'],
  { ttlSeconds: 60 }
);`,
    },
  ];

  return (
    <div className="mh-grid mh-grid-3">
      {steps.map((step, index) => (
        <div key={step.title} className="mh-card">
          <div className="mh-feature-meta">Step {index + 1}</div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <pre>
            <code>{step.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

function FAQ() {
  const items = [
    {
      question: 'Does it work with serverless deployments?',
      answer:
        'Yes. The helpers wrap mysql2 and are compatible with serverless functions as long as you manage connection reuse.',
    },
    {
      question: 'How are admin routes secured?',
      answer:
        'Mutating endpoints expect an Authorization header that matches your ADMIN_SECRET environment variable.',
    },
    {
      question: 'Can I extend the helpers?',
      answer:
        'Absolutely. The helper exposes hooks so you can register your own transformers or wrap existing ones.',
    },
  ];

  return (
    <div className="mh-grid">
      {items.map((item) => (
        <details key={item.question} className="mh-card">
          <summary style={{ cursor: 'pointer', fontWeight: 700 }}>{item.question}</summary>
          <p style={{ marginTop: '1rem' }}>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export default function Mysql2HelperWebsite() {
  const [features, setFeatures] = useState([]);
  const [examples, setExamples] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [featureRes, exampleRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/features?active=true`),
          fetch(`${API_URL}/examples?active=true`),
          fetch(`${API_URL}/stats`),
        ]);

        if (!featureRes.ok || !exampleRes.ok || !statsRes.ok) {
          throw new Error('Network response was not ok');
        }

        const [featureData, exampleData, statsData] = await Promise.all([
          featureRes.json(),
          exampleRes.json(),
          statsRes.json(),
        ]);

        setFeatures(featureData);
        setExamples(exampleData);
        setStats(statsData);
        setError(null);
      } catch (err) {
        console.error('Failed to load data', err);
        setFeatures(fallbackData.features);
        setExamples(fallbackData.examples);
        setStats(null);
        setError('Showing fallback data. Check API connectivity.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(features.map((item) => item.category));
    return ['all', ...Array.from(unique)];
  }, [features]);

  const filteredFeatures = useMemo(() => {
    if (categoryFilter === 'all') {
      return features;
    }
    return features.filter((item) => item.category === categoryFilter);
  }, [features, categoryFilter]);

  return (
    <div className="mh-root">
      <style>{styles}</style>

      <header className="mh-hero">
        <div className="mh-container">
          <span className="mh-pill">
            <Sparkles size={16} /> MySQL2 Helper Lite
          </span>
          <h1>Ship production-ready SQL helpers in minutes.</h1>
          <p>
            A curated set of MySQL utilities built on top of mysql2. Skip repetitive boilerplate,
            ship features faster, and keep your data flows auditable.
          </p>

          <div className="mh-highlight-grid">
            {heroHighlights.map((item) => (
              <div key={item.label} className="mh-highlight">
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mh-cta-group">
            <a href="#features" className="mh-btn-primary">
              Explore features <ArrowRight size={18} />
            </a>
            <a
              href="https://github.com/yourusername/mysql2-helper-lite"
              className="mh-btn-secondary"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="mh-content">
        <div className="mh-container">
          <section id="stats" className="mh-section">
            <SectionTitle
              eyebrow="Snapshot"
              title="Trusted by data-focused teams"
              description="Track adoption and fast-moving metrics right from the API. Seed data is included for quick demos."
            />
            <StatsBar stats={stats} />
          </section>

          <section id="features" className="mh-section">
            <SectionTitle
              eyebrow="Highlights"
              title="Purpose-built helpers for everyday workloads"
              description="Combine the helpers to power reporting dashboards, automation flows, and customer-facing experiences."
            />
            <div className="mh-tabs">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`mh-tab ${categoryFilter === category ? 'mh-tab-active' : ''}`}
                  onClick={() => setCategoryFilter(category)}
                >
                  {category === 'all' ? 'All categories' : category}
                </button>
              ))}
            </div>
            {loading ? (
              <p style={{ textAlign: 'center', color: '#64748b' }}>Loading features…</p>
            ) : (
              <div className="mh-grid mh-grid-2">
                {filteredFeatures.map((feature) => (
                  <FeatureCard key={feature._id || feature.id} feature={feature} />
                ))}
              </div>
            )}
            {error ? <div className="mh-alert">{error}</div> : null}
          </section>

          <section id="examples" className="mh-section">
            <SectionTitle
              eyebrow="Code samples"
              title="Drop-in patterns for real-world apps"
              description="Use the examples as a starting point for transactions, analytics, and background jobs."
            />
            {loading ? (
              <p style={{ textAlign: 'center', color: '#64748b' }}>Loading examples…</p>
            ) : (
              <div className="mh-grid mh-grid-2">
                {examples.map((example) => (
                  <ExampleCard key={example._id || example.id} example={example} />
                ))}
              </div>
            )}
          </section>

          <section id="integration" className="mh-section">
            <SectionTitle
              eyebrow="Integration"
              title="Three steps to production readiness"
              description="Install the helper, configure the connection, and ship your first feature."
            />
            <IntegrationSteps />
          </section>

          <section id="faq" className="mh-section">
            <SectionTitle
              eyebrow="FAQ"
              title="Answers to common questions"
              description="Need more help? Open a GitHub issue or reach out to the maintainers."
            />
            <FAQ />
          </section>
        </div>
      </main>

      <footer className="mh-footer">
        <div className="mh-container">
          <div className="mh-footer-inner">
            <span>MIT Licensed. Made for the developer community.</span>
            <div className="mh-footer-links">
              <a href="https://github.com/yourusername/mysql2-helper-lite">GitHub</a>
              <a href="mailto:support@example.com">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
