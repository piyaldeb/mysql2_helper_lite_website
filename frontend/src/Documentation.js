import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, BookOpen, Copy, Check } from 'lucide-react';

const DocumentationPage = ({ onBack, features }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = useMemo(() => {
    const unique = new Set(features.map((f) => f.category));
    return ['All', ...Array.from(unique).sort()];
  }, [features]);

  const filteredFunctions = useMemo(() => {
    let filtered = features;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((f) => f.category === selectedCategory);
    }

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.title.toLowerCase().includes(search) ||
          f.description.toLowerCase().includes(search) ||
          f.category.toLowerCase().includes(search) ||
          f.code.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [features, selectedCategory, searchTerm]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mh-root">
      <style>{styles}</style>

      {/* Header */}
      <header className="docs-header">
        <div className="mh-container">
          <button onClick={onBack} className="back-button">
            <ArrowLeft size={20} /> Back to Home
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <BookOpen size={32} color="#2563eb" />
            <div>
              <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Complete Documentation</h1>
              <p style={{ margin: '0.5rem 0 0 0', color: '#64748b' }}>
                {features.length} functions • All categories • Search enabled
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="docs-toolbar">
        <div className="mh-container">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search functions, descriptions, or code examples..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="result-count">
            Showing {filteredFunctions.length} of {features.length} functions
          </p>
        </div>
      </div>

      {/* Function List */}
      <main className="docs-content">
        <div className="mh-container">
          {filteredFunctions.length === 0 ? (
            <div className="no-results">
              <p>No functions found matching your search.</p>
            </div>
          ) : (
            <div className="function-list">
              {filteredFunctions.map((func) => (
                <article key={func.id} className="function-card" id={func.id}>
                  <div className="function-header">
                    <div className="function-icon">{func.icon}</div>
                    <div className="function-title-group">
                      <h2 className="function-title">{func.title}</h2>
                      <span className="function-category">{func.category}</span>
                    </div>
                  </div>

                  <p className="function-description">{func.description}</p>

                  <div className="code-block">
                    <div className="code-header">
                      <span className="code-label">Example</span>
                      <button
                        className="copy-button"
                        onClick={() => handleCopy(func.code, func.id)}
                        title="Copy code"
                      >
                        {copiedId === func.id ? (
                          <>
                            <Check size={16} /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} /> Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre>
                      <code>{func.code}</code>
                    </pre>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="docs-footer">
        <div className="mh-container">
          <p>MySQL2 Helper Lite Documentation • {features.length} Total Functions</p>
          <button onClick={onBack} className="back-link">
            ← Return to Home
          </button>
        </div>
      </footer>
    </div>
  );
};

const styles = `
  .mh-root {
    font-family: 'Inter', 'Segoe UI', sans-serif;
    color: #0f172a;
    background-color: #f8fafc;
    min-height: 100vh;
  }

  .mh-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .docs-header {
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: #f8fafc;
    padding: 2rem 0 3rem;
  }

  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(248, 250, 252, 0.1);
    border: 1px solid rgba(248, 250, 252, 0.2);
    color: #f8fafc;
    padding: 0.6rem 1.2rem;
    border-radius: 9999px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .back-button:hover {
    background: rgba(248, 250, 252, 0.2);
    transform: translateX(-2px);
  }

  .docs-toolbar {
    position: sticky;
    top: 0;
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 1.5rem 0;
    z-index: 100;
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  }

  .search-bar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    transition: border-color 0.2s;
  }

  .search-bar:focus-within {
    border-color: #2563eb;
  }

  .search-bar svg {
    color: #64748b;
    flex-shrink: 0;
  }

  .search-input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 1rem;
    color: #0f172a;
  }

  .search-input::placeholder {
    color: #94a3b8;
  }

  .category-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .category-pill {
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    border: 1px solid #e2e8f0;
    background: #ffffff;
    color: #475569;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .category-pill:hover {
    border-color: #2563eb;
    color: #2563eb;
  }

  .category-pill.active {
    background: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
  }

  .result-count {
    text-align: center;
    color: #64748b;
    font-size: 0.875rem;
    margin: 0;
  }

  .docs-content {
    padding: 3rem 0;
  }

  .function-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .function-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
    transition: box-shadow 0.2s;
  }

  .function-card:hover {
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
  }

  .function-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .function-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(14, 165, 233, 0.15));
    display: grid;
    place-items: center;
    font-weight: 700;
    color: #2563eb;
    font-size: 0.875rem;
    flex-shrink: 0;
  }

  .function-title-group {
    flex: 1;
  }

  .function-title {
    margin: 0;
    font-size: 1.5rem;
    color: #0f172a;
    font-weight: 700;
  }

  .function-category {
    display: inline-block;
    margin-top: 0.25rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #2563eb;
  }

  .function-description {
    color: #475569;
    font-size: 1.05rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .code-block {
    background: #0f172a;
    border-radius: 0.75rem;
    overflow: hidden;
  }

  .code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    background: rgba(248, 250, 252, 0.05);
    border-bottom: 1px solid rgba(248, 250, 252, 0.1);
  }

  .code-label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
  }

  .copy-button {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(248, 250, 252, 0.1);
    border: 1px solid rgba(248, 250, 252, 0.2);
    color: #e2e8f0;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    font-size: 0.813rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-button:hover {
    background: rgba(248, 250, 252, 0.2);
  }

  .code-block pre {
    margin: 0;
    padding: 1.25rem;
    overflow-x: auto;
  }

  .code-block code {
    color: #f8fafc;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .no-results {
    text-align: center;
    padding: 4rem 2rem;
    color: #64748b;
  }

  .no-results p {
    font-size: 1.125rem;
  }

  .docs-footer {
    background: #ffffff;
    border-top: 1px solid #e2e8f0;
    padding: 2rem 0;
    margin-top: 3rem;
  }

  .docs-footer .mh-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .docs-footer p {
    margin: 0;
    color: #64748b;
    font-weight: 600;
  }

  .back-link {
    background: transparent;
    border: none;
    color: #2563eb;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .docs-header h1 {
      font-size: 1.75rem;
    }

    .function-card {
      padding: 1.5rem;
    }

    .function-title {
      font-size: 1.25rem;
    }

    .category-pills {
      max-height: 120px;
      overflow-y: auto;
    }
  }
`;

export default DocumentationPage;
