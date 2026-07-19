import React, { useState, useEffect } from 'react';
import { Database, Mail, Building, Globe, Clock, CheckCircle2, AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

export default function AdminRequests({ setActivePage }) {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('All');

  const loadRequests = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('qualityhub_requests') || '[]');
      // Sort newest first
      stored.reverse();
      setRequests(stored);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear local requests history?")) {
      localStorage.removeItem('qualityhub_requests');
      setRequests([]);
    }
  };

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(r => r.serviceType === filter || r.priority === filter);

  return (
    <div style={{ padding: '60px 0 100px' }}>
      <div className="container">
        <div className="section-header">
          <div className="badge-pill" style={{ color: 'var(--primary-cyan)', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
            <Database size={14} style={{ marginRight: '6px' }} /> Requests Database
          </div>
          <h1 className="section-title">Submitted <span className="gradient-text">QA Requests</span></h1>
          <p className="section-desc">
            View, filter, and manage client testing requests submitted via the QualityHub platform.
          </p>
        </div>

        {/* Dashboard Header Bar */}
        <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Filter by:</span>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '6px 14px', fontSize: '0.88rem' }}
            >
              <option value="All">All Requests ({requests.length})</option>
              <option value="Manual Testing">Manual Testing</option>
              <option value="API Testing">API Testing</option>
              <option value="Automation Testing">Automation Testing</option>
              <option value="Performance Testing">Performance Testing</option>
              <option value="Security Testing">Security Testing</option>
              <option value="Critical">Critical Priority</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary btn-sm" onClick={loadRequests}>
              <RefreshCw size={14} /> Refresh
            </button>
            {requests.length > 0 && (
              <button className="btn btn-secondary btn-sm" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }} onClick={handleClearAll}>
                <Trash2 size={14} /> Clear History
              </button>
            )}
          </div>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <Database size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No Requests Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px' }}>
              Submissions sent through the Contact/Request form will automatically appear here in real time.
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => setActivePage('contact')}>
              Test Submit a Request
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredRequests.map((req, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '28px', borderLeft: req.priority === 'Critical' ? '4px solid #ef4444' : req.priority === 'High' ? '4px solid #f59e0b' : '4px solid var(--primary-cyan)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--primary-cyan)', fontWeight: '600', marginRight: '8px' }}>
                      {req.serviceType}
                    </span>
                    <span style={{ 
                      fontSize: '0.8rem', 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      background: req.priority === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : req.priority === 'High' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.08)', 
                      color: req.priority === 'Critical' ? '#f87171' : req.priority === 'High' ? '#fbbf24' : 'var(--text-muted)',
                      fontWeight: '600'
                    }}>
                      Priority: {req.priority}
                    </span>
                  </div>

                  <span style={{ fontSize: '0.82rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} /> {new Date(req.createdAt).toLocaleString()}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Client Name</div>
                    <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{req.fullName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Email</div>
                    <div style={{ color: 'var(--primary-cyan)', fontSize: '0.95rem' }}>{req.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Company</div>
                    <div style={{ fontSize: '0.95rem' }}>{req.company || 'N/A'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Budget Range</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#34d399' }}>{req.budget}</div>
                  </div>
                </div>

                {req.projectUrl && (
                  <div style={{ marginBottom: '16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Globe size={16} color="var(--primary-cyan)" />
                    <span style={{ color: 'var(--text-dim)' }}>Project URL:</span>
                    <a href={req.projectUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-cyan)', textDecoration: 'underline' }}>
                      {req.projectUrl}
                    </a>
                  </div>
                )}

                {req.message && (
                  <div style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>Client Message / Requirements:</div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>{req.message}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
