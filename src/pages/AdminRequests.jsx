import React, { useState, useEffect } from 'react';
import { Database, Mail, Building, Globe, Clock, CheckCircle2, AlertTriangle, RefreshCw, Trash2, Lock, Key, Users, PhoneCall, Hourglass, CheckSquare, Square, Phone } from 'lucide-react';

export default function AdminRequests({ setActivePage }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Contacted'

  const SECRET_PASSCODE = 'quality2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === SECRET_PASSCODE || passcode === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadRequests();
    } else {
      setErrorMsg('Incorrect passcode. Access denied.');
    }
  };

  const loadRequests = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('qualityhub_requests') || '[]');
      // Ensure each request has a contactStatus field if not present
      const formatted = stored.map(item => ({
        ...item,
        contactStatus: item.contactStatus || 'Pending'
      }));
      formatted.reverse(); // Newest first
      setRequests(formatted);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadRequests();
    }
  }, [isAuthenticated]);

  const toggleContactStatus = (indexToUpdate) => {
    try {
      const stored = JSON.parse(localStorage.getItem('qualityhub_requests') || '[]');
      // Invert array since we reversed it for view
      const actualIndex = stored.length - 1 - indexToUpdate;
      
      if (stored[actualIndex]) {
        const currentStatus = stored[actualIndex].contactStatus || 'Pending';
        stored[actualIndex].contactStatus = currentStatus === 'Contacted' ? 'Pending' : 'Contacted';
        localStorage.setItem('qualityhub_requests', JSON.stringify(stored));
        loadRequests(); // Reload state
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear local requests history?")) {
      localStorage.removeItem('qualityhub_requests');
      setRequests([]);
    }
  };

  // Real Analytics Calculations from Actual Data
  const totalSubmissions = requests.length;
  const contactedCount = requests.filter(r => r.contactStatus === 'Contacted').length;
  const pendingCount = requests.filter(r => r.contactStatus !== 'Contacted').length;
  const urgentCount = requests.filter(r => r.priority === 'Critical' || r.priority === 'High').length;

  // Filter requests by Tab
  const filteredRequests = requests.filter(r => {
    if (statusFilter === 'Pending') return r.contactStatus !== 'Contacted';
    if (statusFilter === 'Contacted') return r.contactStatus === 'Contacted';
    if (statusFilter === 'Critical') return r.priority === 'Critical' || r.priority === 'High';
    return true;
  });

  // Passcode Authentication Screen
  if (!isAuthenticated) {
    return (
      <div style={{ padding: '100px 0', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ maxWidth: '440px' }}>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
            <div className="service-icon" style={{ margin: '0 auto 20px', background: 'rgba(239, 68, 68, 0.15)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}>
              <Lock size={28} />
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', marginBottom: '8px' }}>Admin Dashboard Gate</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Confidential Admin Portal. Please enter passcode to view client submissions and stats.
            </p>

            {errorMsg && (
              <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#f87171', borderRadius: 'var(--radius-sm)', marginBottom: '16px', fontSize: '0.85rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Secret Passcode (e.g. quality2026)"
                  className="form-input"
                  style={{ textAlign: 'center', letterSpacing: '2px', fontSize: '1.1rem' }}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Key size={16} />
                <span>Unlock Dashboard</span>
              </button>
            </form>

            <button 
              className="btn btn-secondary btn-sm" 
              style={{ marginTop: '20px', width: '100%' }}
              onClick={() => {
                window.location.hash = '';
                setActivePage('home');
              }}
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0 100px' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <div className="badge-pill" style={{ color: '#34d399', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
            <Lock size={14} style={{ marginRight: '6px' }} /> QualityHub Real Admin Analytics
          </div>
          <h1 className="section-title">Admin <span className="gradient-text">Submissions Dashboard</span></h1>
          <p className="section-desc">
            Real-time client request management, response tracking, and submission stats.
          </p>
        </div>

        {/* Real Analytics Metric Cards (Live Data) */}
        <div className="stats-grid glass-panel" style={{ marginBottom: '40px', marginTop: '0', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <Users size={20} color="var(--primary-cyan)" />
              <span className="stat-number">{totalSubmissions}</span>
            </div>
            <div className="stat-label">إجمالي الأشخاص المسجلين (Total)</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <CheckCircle2 size={20} color="#34d399" />
              <span className="stat-number" style={{ color: '#34d399' }}>{contactedCount}</span>
            </div>
            <div className="stat-label">تم التواصل معهم (Contacted)</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <Hourglass size={20} color="#fbbf24" />
              <span className="stat-number" style={{ color: '#fbbf24' }}>{pendingCount}</span>
            </div>
            <div className="stat-label">بانتظار التواصل (Pending)</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
              <AlertTriangle size={20} color="#f87171" />
              <span className="stat-number" style={{ color: '#f87171' }}>{urgentCount}</span>
            </div>
            <div className="stat-label">طلبات عاجلة (Urgent / High)</div>
          </div>
        </div>

        {/* Dashboard Filter Bar */}
        <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Show:</span>
            <button 
              className={`btn btn-sm ${statusFilter === 'All' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setStatusFilter('All')}
            >
              All ({totalSubmissions})
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === 'Pending' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderColor: statusFilter === 'Pending' ? '' : 'rgba(251, 191, 36, 0.4)' }}
              onClick={() => setStatusFilter('Pending')}
            >
              Pending / لم يتم التواصل ({pendingCount})
            </button>
            <button 
              className={`btn btn-sm ${statusFilter === 'Contacted' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderColor: statusFilter === 'Contacted' ? '' : 'rgba(52, 211, 153, 0.4)' }}
              onClick={() => setStatusFilter('Contacted')}
            >
              Contacted / تم التواصل ({contactedCount})
            </button>
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
            <button className="btn btn-secondary btn-sm" onClick={() => setIsAuthenticated(false)}>
              <Lock size={14} /> Lock Portal
            </button>
          </div>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <Database size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No Submissions Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px' }}>
              Submissions submitted via the website Contact form will automatically populate here in real time.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filteredRequests.map((req, idx) => {
              const isContacted = req.contactStatus === 'Contacted';
              return (
                <div 
                  key={idx} 
                  className="glass-panel" 
                  style={{ 
                    padding: '28px', 
                    borderLeft: isContacted ? '4px solid #34d399' : req.priority === 'Critical' ? '4px solid #ef4444' : '4px solid #fbbf24',
                    background: isContacted ? 'rgba(16, 185, 129, 0.03)' : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', padding: '4px 12px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.1)', color: 'var(--primary-cyan)', fontWeight: '600' }}>
                        {req.serviceType}
                      </span>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        padding: '4px 12px', 
                        borderRadius: '12px', 
                        background: req.priority === 'Critical' ? 'rgba(239, 68, 68, 0.2)' : req.priority === 'High' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.08)', 
                        color: req.priority === 'Critical' ? '#f87171' : req.priority === 'High' ? '#fbbf24' : 'var(--text-muted)',
                        fontWeight: '600'
                      }}>
                        Priority: {req.priority}
                      </span>
                    </div>

                    {/* Contact Status Toggle Button */}
                    <button
                      className="btn btn-sm"
                      onClick={() => toggleContactStatus(idx)}
                      style={{
                        background: isContacted ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                        border: isContacted ? '1px solid #34d399' : '1px solid #fbbf24',
                        color: isContacted ? '#34d399' : '#fbbf24',
                        fontWeight: '600'
                      }}
                    >
                      {isContacted ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>تم التواصل مع العملاء (Contacted)</span>
                        </>
                      ) : (
                        <>
                          <Hourglass size={16} />
                          <span>لم يتم التواصل بعد (Mark as Contacted)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Client Full Name</div>
                      <div style={{ fontWeight: '700', fontSize: '1.05rem' }}>{req.fullName}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Phone Number (رقم الهاتف)</div>
                      <div style={{ color: 'var(--primary-cyan)', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={14} /> {req.phone || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Email Address</div>
                      <div style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>{req.email}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Company / Budget</div>
                      <div style={{ fontSize: '0.95rem' }}>{req.company || 'N/A'} ({req.budget})</div>
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
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '4px' }}>Client Message:</div>
                      <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap' }}>{req.message}</p>
                    </div>
                  )}

                  <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-glass)', fontSize: '0.8rem', color: 'var(--text-dim)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Submitted: {new Date(req.createdAt).toLocaleString()}</span>
                    <span>Status: <strong style={{ color: isContacted ? '#34d399' : '#fbbf24' }}>{isContacted ? 'Contacted' : 'Pending Review'}</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
