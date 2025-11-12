import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Trash2, Copy, Check } from 'lucide-react';

const API_URL =
  (typeof window !== 'undefined' && window.__MYSQL2_HELPER_API_URL__) ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:3001/api';

const EXAMPLE_QUERIES = [
  {
    name: 'Get All Users',
    code: `// Get all active users
const users = await db.query(
  'SELECT * FROM users WHERE status = ?',
  ['active']
);`,
  },
  {
    name: 'Insert User',
    code: `// Insert a new user
const userId = await db.insert('users', {
  name: 'Jane Doe',
  email: 'jane@example.com',
  status: 'active'
});`,
  },
  {
    name: 'Count Records',
    code: `// Count total users
const totalUsers = await db.count('users');
const activeUsers = await db.countBy('users', 'status', 'active');`,
  },
  {
    name: 'Fuzzy Search',
    code: `// Search with typo tolerance
const results = await db.fuzzySearch('products',
  'name',
  'laptp',  // will match 'laptop'
  { threshold: 0.3 }
);`,
  },
  {
    name: 'Time Travel Query',
    code: `// Query data as it existed yesterday
const snapshot = await db.timeTravel(
  'orders',
  new Date(Date.now() - 86400000)
);`,
  },
];

export default function Terminal() {
  const [code, setCode] = useState(EXAMPLE_QUERIES[0].code);
  const [output, setOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executeCode = async () => {
    setIsRunning(true);
    const timestamp = new Date().toLocaleTimeString();

    setOutput(prev => [...prev, {
      type: 'command',
      content: code,
      timestamp
    }]);

    try {
      // Simulate API call (replace with actual API when ready)
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock response
      const mockResponse = {
        success: true,
        data: [
          { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' }
        ],
        executionTime: '12ms'
      };

      setOutput(prev => [...prev, {
        type: 'success',
        content: JSON.stringify(mockResponse, null, 2),
        timestamp: new Date().toLocaleTimeString()
      }]);
    } catch (error) {
      setOutput(prev => [...prev, {
        type: 'error',
        content: error.message,
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsRunning(false);
    }
  };

  const clearOutput = () => {
    setOutput([]);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadExample = (example) => {
    setCode(example.code);
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="terminal-title">
          <TerminalIcon size={20} />
          <span>Interactive MySQL2 Helper Terminal</span>
        </div>
        <div className="terminal-actions">
          <button onClick={copyCode} className="terminal-btn" title="Copy code">
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
          <button onClick={clearOutput} className="terminal-btn" title="Clear output">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="terminal-examples">
        {EXAMPLE_QUERIES.map((example, idx) => (
          <button
            key={idx}
            onClick={() => loadExample(example)}
            className="example-btn"
          >
            {example.name}
          </button>
        ))}
      </div>

      <div className="terminal-body">
        <div className="terminal-input-section">
          <div className="terminal-label">Code Editor</div>
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="terminal-textarea"
            placeholder="Write your MySQL2 Helper code here..."
            spellCheck={false}
          />
          <button
            onClick={executeCode}
            disabled={isRunning}
            className="terminal-run-btn"
          >
            <Play size={18} />
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>

        <div className="terminal-output-section">
          <div className="terminal-label">Output</div>
          <div ref={outputRef} className="terminal-output">
            {output.length === 0 ? (
              <div className="terminal-placeholder">
                Output will appear here. Try running some code!
              </div>
            ) : (
              output.map((item, idx) => (
                <div key={idx} className={`output-item output-${item.type}`}>
                  <div className="output-timestamp">[{item.timestamp}]</div>
                  <pre className="output-content">{item.content}</pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        .terminal-container {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .terminal-header {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(10px);
          padding: 1rem 1.5rem;
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .terminal-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #e2e8f0;
          font-weight: 600;
          font-size: 1rem;
        }

        .terminal-actions {
          display: flex;
          gap: 0.5rem;
        }

        .terminal-btn {
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #a5b4fc;
          padding: 0.5rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .terminal-btn:hover {
          background: rgba(99, 102, 241, 0.25);
          border-color: rgba(99, 102, 241, 0.5);
        }

        .terminal-examples {
          padding: 1rem 1.5rem;
          background: rgba(15, 23, 42, 0.3);
          border-bottom: 1px solid rgba(99, 102, 241, 0.2);
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .example-btn {
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: #c7d2fe;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .example-btn:hover {
          background: rgba(99, 102, 241, 0.2);
          border-color: rgba(99, 102, 241, 0.5);
          transform: translateY(-1px);
        }

        .terminal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(99, 102, 241, 0.1);
        }

        @media (max-width: 1024px) {
          .terminal-body {
            grid-template-columns: 1fr;
          }
        }

        .terminal-input-section,
        .terminal-output-section {
          background: #1a1a2e;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .terminal-label {
          color: #94a3b8;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 0.75rem;
        }

        .terminal-textarea {
          flex: 1;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 0.75rem;
          color: #e2e8f0;
          font-family: 'JetBrains Mono', 'Consolas', monospace;
          font-size: 0.9rem;
          padding: 1rem;
          resize: none;
          min-height: 300px;
          line-height: 1.6;
        }

        .terminal-textarea:focus {
          outline: none;
          border-color: rgba(99, 102, 241, 0.5);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .terminal-run-btn {
          margin-top: 1rem;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          color: white;
          padding: 0.875rem 1.5rem;
          border-radius: 0.75rem;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .terminal-run-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
        }

        .terminal-run-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .terminal-output {
          flex: 1;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 0.75rem;
          padding: 1rem;
          overflow-y: auto;
          min-height: 300px;
          max-height: 400px;
          font-family: 'JetBrains Mono', 'Consolas', monospace;
          font-size: 0.875rem;
        }

        .terminal-placeholder {
          color: #64748b;
          font-style: italic;
          text-align: center;
          padding: 2rem;
        }

        .output-item {
          margin-bottom: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(99, 102, 241, 0.1);
        }

        .output-item:last-child {
          border-bottom: none;
        }

        .output-timestamp {
          color: #64748b;
          font-size: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .output-content {
          margin: 0;
          padding: 0.75rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          line-height: 1.6;
        }

        .output-command .output-content {
          background: rgba(59, 130, 246, 0.1);
          border-left: 3px solid #3b82f6;
          color: #93c5fd;
        }

        .output-success .output-content {
          background: rgba(16, 185, 129, 0.1);
          border-left: 3px solid #10b981;
          color: #6ee7b7;
        }

        .output-error .output-content {
          background: rgba(239, 68, 68, 0.1);
          border-left: 3px solid #ef4444;
          color: #fca5a5;
        }

        .terminal-output::-webkit-scrollbar {
          width: 8px;
        }

        .terminal-output::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 4px;
        }

        .terminal-output::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 4px;
        }

        .terminal-output::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
}
