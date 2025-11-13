import React, { useEffect } from 'react';
import { ExternalLink, BarChart3, Home, DollarSign } from 'lucide-react';

const adminStyles = `
  .admin-redirect {
    min-height: 100vh;
    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #fae8ff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }

  .redirect-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 1.5rem;
    padding: 3rem;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    text-align: center;
  }

  .redirect-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2rem;
    color: white;
  }

  .redirect-card h1 {
    margin: 0 0 1rem 0;
    font-size: 2rem;
    color: #0f172a;
  }

  .redirect-card p {
    color: #64748b;
    line-height: 1.7;
    margin-bottom: 2rem;
    font-size: 1.05rem;
  }

  .analytics-buttons {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
  }

  .analytics-btn {
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    transition: all 0.3s;
    text-decoration: none;
  }

  .analytics-btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .analytics-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
  }

  .analytics-btn-secondary {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
    border: 2px solid rgba(99, 102, 241, 0.2);
  }

  .analytics-btn-secondary:hover {
    background: rgba(99, 102, 241, 0.15);
    transform: translateY(-2px);
  }

  .analytics-btn-home {
    background: white;
    color: #64748b;
    border: 2px solid #e2e8f0;
  }

  .analytics-btn-home:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
    transform: translateY(-2px);
  }

  .info-section {
    background: rgba(99, 102, 241, 0.05);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-top: 2rem;
    text-align: left;
  }

  .info-section h3 {
    margin: 0 0 0.75rem 0;
    color: #0f172a;
    font-size: 1.1rem;
  }

  .info-section ul {
    margin: 0;
    padding-left: 1.5rem;
    color: #475569;
    line-height: 1.8;
  }

  .info-section li {
    margin-bottom: 0.5rem;
  }

  .admin-email {
    background: rgba(236, 72, 153, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    display: inline-block;
    margin-top: 1rem;
    font-family: 'JetBrains Mono', monospace;
    color: #ec4899;
    font-weight: 600;
  }
`;

export default function AdminDashboard({ onBack }) {
  useEffect(() => {
    // Track admin dashboard access
    if (window.gtag) {
      window.gtag('event', 'admin_dashboard_access', {
        event_category: 'Admin',
        event_label: 'Dashboard Redirect'
      });
    }
  }, []);

  return (
    <div className="admin-redirect">
      <style>{adminStyles}</style>

      <div className="redirect-card">
        <div className="redirect-icon">
          <BarChart3 size={40} />
        </div>

        <h1>Admin Dashboard</h1>
        <p>
          This site uses <strong>Google Analytics</strong> for comprehensive visitor tracking and analytics.
          Click below to access your Google Analytics dashboard for real-time insights.
        </p>

        <div className="analytics-buttons">
          <a
            href="https://analytics.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="analytics-btn analytics-btn-primary"
          >
            <BarChart3 size={20} />
            Open Google Analytics
            <ExternalLink size={18} />
          </a>

          <a
            href="https://www.google.com/adsense/"
            target="_blank"
            rel="noopener noreferrer"
            className="analytics-btn analytics-btn-secondary"
          >
            <DollarSign size={20} />
            Open Google AdSense
            <ExternalLink size={18} />
          </a>

          <button onClick={onBack} className="analytics-btn analytics-btn-home">
            <Home size={20} />
            Back to Home
          </button>
        </div>

        <div className="info-section">
          <h3>What You Can See in Google Analytics:</h3>
          <ul>
            <li><strong>Real-time visitors</strong> - See who's on your site right now</li>
            <li><strong>Traffic sources</strong> - Where visitors come from</li>
            <li><strong>User behavior</strong> - Pages visited, time spent, bounce rate</li>
            <li><strong>Geographic data</strong> - Countries, cities, and languages</li>
            <li><strong>Device analytics</strong> - Desktop, mobile, tablet breakdown</li>
            <li><strong>Conversions & goals</strong> - Track downloads and GitHub stars</li>
          </ul>
        </div>

        <div className="info-section" style={{ marginTop: '1rem' }}>
          <h3>Setup Instructions:</h3>
          <ul>
            <li>Sign in to Google Analytics with: <span className="admin-email">piyaldeb87@gmail.com</span></li>
            <li>If not set up yet, see <strong>GOOGLE_SETUP.md</strong> for detailed instructions</li>
            <li>Replace placeholder IDs in <code>frontend/public/index.html</code></li>
            <li>Deploy to see live analytics data</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
