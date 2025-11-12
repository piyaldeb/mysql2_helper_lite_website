import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  Globe, 
  Monitor, 
  TrendingUp,
  Calendar,
  RefreshCw,
  Edit,
  Save,
  X,
  Home
} from 'lucide-react';

const API_URL =
  (typeof window !== 'undefined' && window.__MYSQL2_HELPER_API_URL__) ||
  process.env.REACT_APP_API_URL ||
  'http://localhost:3001/api';

const adminStyles = `
  .admin-dashboard {
    min-height: 100vh;
    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #fae8ff 100%);
    padding: 2rem;
    font-family: 'Inter', 'Segoe UI', sans-serif;
  }

  .admin-header {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: 1rem;
    padding: 1.5rem 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .admin-header h1 {
    margin: 0;
    font-size: 1.75rem;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .admin-actions {
    display: flex;
    gap: 1rem;
  }

  .admin-btn {
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    border: none;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;
  }

  .admin-btn-primary {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
  }

  .admin-btn-secondary {
    background: rgba(99, 102, 241, 0.1);
    color: #6366f1;
  }

  .admin-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
  }

  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .stat-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6366f1;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
  }

  .stat-label {
    color: #64748b;
    font-size: 0.9rem;
    margin: 0.25rem 0 0 0;
  }

  .chart-container {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .chart-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .chart-bar {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .chart-label {
    min-width: 120px;
    font-size: 0.9rem;
    color: #475569;
  }

  .chart-bar-fill {
    flex: 1;
    height: 32px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.75rem;
    color: white;
    font-weight: 600;
    font-size: 0.85rem;
    transition: width 0.3s ease;
  }

  .visitors-table {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    overflow-x: auto;
  }

  .visitors-table table {
    width: 100%;
    border-collapse: collapse;
  }

  .visitors-table th,
  .visitors-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }

  .visitors-table th {
    font-weight: 700;
    color: #0f172a;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .visitors-table td {
    color: #475569;
    font-size: 0.9rem;
  }

  .visitors-table tr:hover {
    background: rgba(99, 102, 241, 0.05);
  }

  .edit-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .edit-modal-content {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .edit-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .edit-modal-header h2 {
    margin: 0;
    color: #0f172a;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #0f172a;
  }

  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid rgba(99, 102, 241, 0.2);
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #6366f1;
  }

  .form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    color: #64748b;
  }

  .error {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .filter-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .filter-controls select,
  .filter-controls input {
    padding: 0.6rem 1rem;
    border: 2px solid rgba(99, 102, 241, 0.2);
    border-radius: 0.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .admin-dashboard {
      padding: 1rem;
    }

    .admin-header {
      flex-direction: column;
      gap: 1rem;
      align-items: flex-start;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
`;

function AdminDashboard({ onBack, adminSecret }) {
  const [stats, setStats] = useState(null);
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStats, setEditingStats] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [daysFilter, setDaysFilter] = useState(30);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = {
        'Content-Type': 'application/json',
        Authorization: adminSecret,
      };

      const [statsRes, visitorsRes, visitorStatsRes] = await Promise.all([
        fetch(`${API_URL}/analytics/summary`, { headers }).catch(() => null),
        fetch(`${API_URL}/analytics/visitors?limit=50`, { headers }).catch(() => null),
        fetch(`${API_URL}/analytics/visitor-stats?days=${daysFilter}`, { headers }).catch(() => null),
      ]);

      // Check if backend is unavailable
      if (!statsRes || !visitorsRes || !visitorStatsRes) {
        throw new Error('Backend API is not available. Please ensure the backend server is running and properly configured.');
      }

      if (!statsRes.ok || !visitorsRes.ok || !visitorStatsRes.ok) {
        throw new Error('Failed to fetch data from backend');
      }

      const [statsData, visitorsData, visitorStatsData] = await Promise.all([
        statsRes.json(),
        visitorsRes.json(),
        visitorStatsRes.json(),
      ]);

      setStats({ ...statsData, ...visitorStatsData });
      setVisitors(visitorsData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);

      // Set demo data if backend is unavailable
      if (err.message.includes('Backend API is not available')) {
        setStats({
          totalPageviews: 0,
          uniqueVisitors: 0,
          avgVisitDuration: 0,
          totalDownloads: 1500,
          githubStars: 250,
          activeUsers: 1000,
        });
        setVisitors([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [daysFilter, adminSecret]);

  const handleUpdateStats = async () => {
    try {
      const response = await fetch(`${API_URL}/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: adminSecret,
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) throw new Error('Failed to update stats');

      await fetchData();
      setEditingStats(false);
      setEditForm({});
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  if (loading && !stats) {
    return (
      <div className="admin-dashboard">
        <style>{adminStyles}</style>
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <style>{adminStyles}</style>

      <div className="admin-header">
        <h1>
          <BarChart3 size={28} /> Admin Dashboard
        </h1>
        <div className="admin-actions">
          <button className="admin-btn admin-btn-secondary" onClick={fetchData}>
            <RefreshCw size={18} /> Refresh
          </button>
          <button className="admin-btn admin-btn-secondary" onClick={onBack}>
            <Home size={18} /> Home
          </button>
        </div>
      </div>

      {error && (
        <div className="error">
          <strong>⚠️ {error}</strong>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.9 }}>
            {error.includes('Backend API is not available') && (
              <>
                The admin dashboard requires a running backend server. To set up the backend:
                <ol style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                  <li>Navigate to the <code>backend</code> directory</li>
                  <li>Install dependencies: <code>npm install</code></li>
                  <li>Configure <code>.env</code> file with MongoDB URI and ADMIN_SECRET</li>
                  <li>Start the server: <code>npm start</code></li>
                </ol>
                See <code>ADMIN.md</code> for detailed setup instructions.
              </>
            )}
          </p>
        </div>
      )}

      <div className="filter-controls">
        <label>
          Period:
          <select
            value={daysFilter}
            onChange={(e) => setDaysFilter(Number(e.target.value))}
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
            <option value={365}>Last year</option>
          </select>
        </label>
      </div>

      {stats && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <p className="stat-value">{stats.totalVisits || 0}</p>
                  <p className="stat-label">Total Visits</p>
                </div>
                <div className="stat-icon">
                  <Users size={24} />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <p className="stat-value">{stats.uniqueVisitors || 0}</p>
                  <p className="stat-label">Unique Visitors</p>
                </div>
                <div className="stat-icon">
                  <Globe size={24} />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <p className="stat-value">
                    {formatDuration(stats.averageVisitDuration || 0)}
                  </p>
                  <p className="stat-label">Avg. Visit Duration</p>
                </div>
                <div className="stat-icon">
                  <Clock size={24} />
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div>
                  <p className="stat-value">{stats.downloads || 0}</p>
                  <p className="stat-label">Total Downloads</p>
                </div>
                <div className="stat-icon">
                  <TrendingUp size={24} />
                </div>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <div className="chart-title">
              <Calendar size={20} /> Visits Over Time
            </div>
            {stats.visitsByDay && stats.visitsByDay.length > 0 ? (
              stats.visitsByDay.map((item, index) => {
                const maxCount = Math.max(...stats.visitsByDay.map((v) => v.count));
                const percentage = (item.count / maxCount) * 100;
                return (
                  <div key={index} className="chart-bar">
                    <div className="chart-label">{item.date}</div>
                    <div
                      className="chart-bar-fill"
                      style={{ width: `${percentage}%` }}
                    >
                      {item.count}
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: '#64748b' }}>No data available</p>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {stats.visitsByDevice && (
              <div className="chart-container">
                <div className="chart-title">
                  <Monitor size={20} /> Devices
                </div>
                {stats.visitsByDevice.map((item, index) => {
                  const total = stats.visitsByDevice.reduce((sum, v) => sum + v.count, 0);
                  const percentage = (item.count / total) * 100;
                  return (
                    <div key={index} className="chart-bar">
                      <div className="chart-label">{item.device}</div>
                      <div
                        className="chart-bar-fill"
                        style={{ width: `${percentage}%` }}
                      >
                        {item.count}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {stats.visitsByBrowser && (
              <div className="chart-container">
                <div className="chart-title">
                  <Globe size={20} /> Browsers
                </div>
                {stats.visitsByBrowser.map((item, index) => {
                  const total = stats.visitsByBrowser.reduce((sum, v) => sum + v.count, 0);
                  const percentage = (item.count / total) * 100;
                  return (
                    <div key={index} className="chart-bar">
                      <div className="chart-label">{item.browser}</div>
                      <div
                        className="chart-bar-fill"
                        style={{ width: `${percentage}%` }}
                      >
                        {item.count}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {stats.visitsByPath && (
            <div className="chart-container">
              <div className="chart-title">
                <TrendingUp size={20} /> Top Pages
              </div>
              {stats.visitsByPath.map((item, index) => {
                const maxCount = Math.max(...stats.visitsByPath.map((v) => v.count));
                const percentage = (item.count / maxCount) * 100;
                return (
                  <div key={index} className="chart-bar">
                    <div className="chart-label">{item.path || '/'}</div>
                    <div
                      className="chart-bar-fill"
                      style={{ width: `${percentage}%` }}
                    >
                      {item.count}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="visitors-table">
            <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Recent Visitors</h2>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>IP</th>
                  <th>Device</th>
                  <th>Browser</th>
                  <th>OS</th>
                  <th>Path</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {visitors.length > 0 ? (
                  visitors.map((visitor) => (
                    <tr key={visitor._id}>
                      <td>{formatDate(visitor.timestamp)}</td>
                      <td>{visitor.ip}</td>
                      <td>{visitor.device || 'Unknown'}</td>
                      <td>{visitor.browser || 'Unknown'}</td>
                      <td>{visitor.os || 'Unknown'}</td>
                      <td>{visitor.path || '/'}</td>
                      <td>{formatDuration(visitor.visitDuration)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', color: '#64748b' }}>
                      No visitors yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="chart-container" style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div className="chart-title">Stats Management</div>
              {!editingStats && (
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => {
                    setEditingStats(true);
                    setEditForm({
                      totalDownloads: stats.downloads || 0,
                      githubStars: stats.stars || 0,
                      activeUsers: stats.users || 0,
                    });
                  }}
                >
                  <Edit size={18} /> Edit Stats
                </button>
              )}
            </div>

            {editingStats && (
              <div className="edit-modal">
                <div className="edit-modal-content">
                  <div className="edit-modal-header">
                    <h2>Edit Statistics</h2>
                    <button
                      onClick={() => {
                        setEditingStats(false);
                        setEditForm({});
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        color: '#64748b',
                      }}
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Total Downloads</label>
                    <input
                      type="number"
                      value={editForm.totalDownloads || 0}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          totalDownloads: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>GitHub Stars</label>
                    <input
                      type="number"
                      value={editForm.githubStars || 0}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          githubStars: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Active Users</label>
                    <input
                      type="number"
                      value={editForm.activeUsers || 0}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          activeUsers: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                  </div>

                  <div className="form-actions">
                    <button
                      className="admin-btn admin-btn-secondary"
                      onClick={() => {
                        setEditingStats(false);
                        setEditForm({});
                      }}
                    >
                      <X size={18} /> Cancel
                    </button>
                    <button
                      className="admin-btn admin-btn-primary"
                      onClick={handleUpdateStats}
                    >
                      <Save size={18} /> Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                  Downloads
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 700 }}>
                  {stats.downloads || 0}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                  GitHub Stars
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 700 }}>
                  {stats.stars || 0}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                  Active Users
                </p>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 700 }}>
                  {stats.users || 0}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;

