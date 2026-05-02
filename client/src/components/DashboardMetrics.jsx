import React, { useEffect, useState } from 'react';
import { Users, ClipboardList, ScanLine, AlertTriangle } from 'lucide-react';
import { API_BASE } from '../config.js';
import { readApiJson } from '../utils/readApiJson.js';

const DashboardMetrics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE}/reports/today`);
        const data = await readApiJson(res);
        if (res.ok) {
          setStats(data);
          setApiError(false);
        } else {
          setStats({ visitorCount: 0, studentEntryCount: 0, activeVisitors: 0 });
          setApiError(true);
        }
      } catch (e) {
        setStats({ visitorCount: 0, studentEntryCount: 0, activeVisitors: 0 });
        setApiError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !stats) {
    return (
      <div className="metrics-row">
        {[1, 2, 3].map((i) => (
          <div key={i} className="metric-card metric-skeleton" />
        ))}
      </div>
    );
  }

  const cards = [
    { title: 'Active Visitors', value: stats.activeVisitors, subtitle: 'Currently in building', gradient: 'pink', Icon: Users },
    { title: "Today's Visitors", value: stats.visitorCount, subtitle: 'Checked in today', gradient: 'blue', Icon: ClipboardList },
    { title: 'Student Entries', value: stats.studentEntryCount, subtitle: 'QR scans today', gradient: 'teal', Icon: ScanLine }
  ];

  return (
    <>
      {apiError && (
        <div className="api-status-banner" role="alert">
          <AlertTriangle className="api-status-icon" size={20} strokeWidth={2} />
          <span>
            Unable to reach the API. Locally run <code>cd backend && npm start</code>. On Vercel, deploy the backend
            elsewhere (e.g. Render/Railway), set <code>VITE_API_URL</code> to that server&apos;s base URL (no{' '}
            <code>/api</code> suffix needed), add your site URL to backend <code>ALLOWED_ORIGINS</code>, then redeploy
            the frontend.
          </span>
        </div>
      )}
      <div className="metrics-row">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className={`metric-card metric-${card.gradient}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="metric-pattern" />
          <div className="metric-icon">{React.createElement(card.Icon, { size: 24, strokeWidth: 2 })}</div>
          <div className="metric-content">
            <span className="metric-title">{card.title}</span>
            <span className="metric-value">{card.value}</span>
            <span className="metric-subtitle">{card.subtitle}</span>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default DashboardMetrics;
