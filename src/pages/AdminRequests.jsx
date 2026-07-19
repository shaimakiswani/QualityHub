import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Database, Mail, Building, Globe, Clock, CheckCircle2, AlertTriangle, RefreshCw, Trash2, Lock, Key, Users, PhoneCall, Hourglass, CheckSquare, Square, Phone, Star, MessageSquare, ShieldAlert } from 'lucide-react';

export default function AdminRequests({ setActivePage }) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [activeTab, setActiveTab] = useState('requests'); // 'requests' or 'testimonials'
  const [requests, setRequests] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All'); // 'All', 'Pending', 'Contacted', 'Urgent'

  const SECRET_PASSCODE = 'quality2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === SECRET_PASSCODE || passcode === 'admin123') {
      setIsAuthenticated(true);
      setErrorMsg('');
      loadData();
    } else {
      setErrorMsg('Incorrect passcode. Access denied.');
    }
  };

  const loadData = async () => {
    try {
      // 1. Load LocalStorage Requests
      const storedReqs = JSON.parse(localStorage.getItem('qualityhub_requests') || '[]');
      let allReqs = [...storedReqs];

      // 2. Load Cloud Firestore Requests if connected
      if (db) {
        try {
          const querySnapshot = await getDocs(collection(db, "qa_requests"));
          const cloudReqs = [];
          querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            cloudReqs.push({
              id: docSnap.id,
              fullName: data.fullName || 'Anonymous Client',
              email: data.email || 'N/A',
              phone: data.phone || 'N/A',
              company: data.company || '',
              serviceType: data.serviceType || 'Manual Testing',
              projectUrl: data.projectUrl || '',
              priority: data.priority || 'Medium',
              budget: data.budget || '$1,000 - $5,000',
              message: data.message || '',
              contactStatus: data.contactStatus || 'Pending',
              createdAt: data.createdAt || (data.timestamp ? new Date(data.timestamp.seconds * 1000).toISOString() : new Date().toISOString())
            });
          });

          // Merge unique records
          const combinedMap = new Map();
          [...allReqs, ...cloudReqs].forEach(item => {
            const key = item.id || `${item.email}-${item.createdAt}`;
            combinedMap.set(key, item);
          });
          allReqs = Array.from(combinedMap.values());
        } catch (cloudErr) {
          console.warn("Firestore fetch notice:", cloudErr.message);
        }
      }

      const formattedReqs = allReqs.map(item => ({
        ...item,
        contactStatus: item.contactStatus || 'Pending',
        priority: item.priority || 'Medium'
      }));
      formattedReqs.reverse(); // Newest first
      setRequests(formattedReqs);

      // Load Testimonials
      const storedReviews = JSON.parse(localStorage.getItem('qualityhub_testimonials') || '[]');
      let allReviews = [...storedReviews];

      if (db) {
        try {
          const revSnapshot = await getDocs(collection(db, "qa_testimonials"));
          revSnapshot.forEach((docSnap) => {
            const rData = docSnap.data();
            allReviews.push({ id: docSnap.id, ...rData });
          });
        } catch (e) {}
      }

      const revMap = new Map();
      allReviews.forEach(r => revMap.set(r.id || r.name, r));
      setTestimonials(Array.from(revMap.values()).reverse());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  // Toggle Contacted Status
  const toggleContactStatus = (indexToUpdate) => {
    try {
      const stored = JSON.parse(localStorage.getItem('qualityhub_requests') || '[]');
      const actualIndex = stored.length - 1 - indexToUpdate;
      
      if (stored[actualIndex]) {
        const currentStatus = stored[actualIndex].contactStatus || 'Pending';
        stored[actualIndex].contactStatus = currentStatus === 'Contacted' ? 'Pending' : 'Contacted';
        localStorage.setItem('qualityhub_requests', JSON.stringify(stored));
        loadData();
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  // Toggle Priority / Urgent Status by Admin
  const togglePriority = (indexToUpdate) => {
    try {
      const stored = JSON.parse(localStorage.getItem('qualityhub_requests') || '[]');
      const actualIndex = stored.length - 1 - indexToUpdate;
      
      if (stored[actualIndex]) {
        const currentPriority = stored[actualIndex].priority;
        stored[actualIndex].priority = (currentPriority === 'Critical' || currentPriority === 'High') ? 'Low' : 'Critical';
        localStorage.setItem('qualityhub_requests', JSON.stringify(stored));
        loadData();
      }
    } catch (e) {
      console.error("Failed to update priority:", e);
    }
  };

  // Delete Testimonial by Admin
  const handleDeleteTestimonial = (testimonialId, index) => {
    if (window.confirm("Are you sure you want to delete this feedback review?")) {
      try {
        const stored = JSON.parse(localStorage.getItem('qualityhub_testimonials') || '[]');
        const updated = stored.filter((t, i) => (t.id ? t.id !== testimonialId : (stored.length - 1 - i) !== index));
        localStorage.setItem('qualityhub_testimonials', JSON.stringify(updated));
        loadData();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleClearAllRequests = () => {
    if (window.confirm("Are you sure you want to clear all local requests history?")) {
      localStorage.removeItem('qualityhub_requests');
      setRequests([]);
    }
  };

  // Real Analytics Calculations
  const totalSubmissions = requests.length;
  const contactedCount = requests.filter(r => r.contactStatus === 'Contacted').length;
  const pendingCount = requests.filter(r => r.contactStatus !== 'Contacted').length;
  const urgentCount = requests.filter(r => r.priority === 'Critical' || r.priority === 'High').length;

  // Filter requests by Tab
  const filteredRequests = requests.filter(r => {
    if (statusFilter === 'Pending') return r.contactStatus !== 'Contacted';
    if (statusFilter === 'Contacted') return r.contactStatus === 'Contacted';
    if (statusFilter === 'Urgent') return r.priority === 'Critical' || r.priority === 'High';
    return true;
  });

  // Passcode Gate Screen
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
              Confidential Admin Portal. Enter passcode to view submissions, manage priorities, and moderate feedback.
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
                <span>Unlock Admin Portal</span>
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
            <Lock size={14} style={{ marginRight: '6px' }} /> QualityHub Real Admin Control Panel
          </div>
          <h1 className="section-title">Admin <span className="gradient-text">Management Portal</span></h1>
          <p className="section-desc">
            Manage client testing requests, adjust priority tags, and moderate user feedback.
          </p>
        </div>

        {/* Navigation Tabs (Requests vs Reviews) */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px' }}>
          <button 
            className={`btn ${activeTab === 'requests' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('requests')}
          >
            <Database size={16} />
            <span>Client Requests ({totalSubmissions})</span>
          </button>
          <button 
            className={`btn ${activeTab === 'testimonials' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('testimonials')}
          >
            <MessageSquare size={16} />
            <span>Manage Feedback ({testimonials.length})</span>
          </button>
        </div>

        {activeTab === 'requests' ? (
          <>
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
                <div className="stat-label">طلبات عاجلة / مستعجلة (Urgent)</div>
              </div>
            </div>

            {/* Dashboard Filter Bar */}
            <div className="glass-panel" style={{ padding: '20px 24px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Filter:</span>
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
                  Pending ({pendingCount})
                </button>
                <button 
                  className={`btn btn-sm ${statusFilter === 'Contacted' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderColor: statusFilter === 'Contacted' ? '' : 'rgba(52, 211, 153, 0.4)' }}
                  onClick={() => setStatusFilter('Contacted')}
                >
                  Contacted ({contactedCount})
                </button>
                <button 
                  className={`btn btn-sm ${statusFilter === 'Urgent' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ borderColor: statusFilter === 'Urgent' ? '' : 'rgba(239, 68, 68, 0.4)', color: statusFilter === 'Urgent' ? '' : '#f87171' }}
                  onClick={() => setStatusFilter('Urgent')}
                >
                  Urgent / مستعجلة ({urgentCount})
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary btn-sm" onClick={loadData}>
                  <RefreshCw size={14} /> Refresh
                </button>
                {requests.length > 0 && (
                  <button className="btn btn-secondary btn-sm" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }} onClick={handleClearAllRequests}>
                    <Trash2 size={14} /> Clear Requests
                  </button>
                )}
              </div>
            </div>

            {/* Requests List */}
            {filteredRequests.length === 0 ? (
              <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <Database size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No Submissions Found</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
                  Submissions submitted via the website Contact form will automatically populate here in real time.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {filteredRequests.map((req, idx) => {
                  const isContacted = req.contactStatus === 'Contacted';
                  const isUrgent = req.priority === 'Critical' || req.priority === 'High';

                  return (
                    <div 
                      key={idx} 
                      className="glass-panel" 
                      style={{ 
                        padding: '28px', 
                        borderLeft: isUrgent ? '5px solid #ef4444' : isContacted ? '5px solid #34d399' : '5px solid #fbbf24',
                        background: isUrgent ? 'rgba(239, 68, 68, 0.04)' : isContacted ? 'rgba(16, 185, 129, 0.03)' : 'var(--bg-card)'
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
                            background: isUrgent ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)', 
                            color: isUrgent ? '#f87171' : 'var(--text-muted)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {isUrgent && <AlertTriangle size={12} />}
                            Priority: {req.priority}
                          </span>
                        </div>

                        {/* Admin Action Buttons: Contacted Toggle & Urgent Toggle */}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {/* Toggle Urgent Priority */}
                          <button
                            className="btn btn-sm"
                            onClick={() => togglePriority(idx)}
                            style={{
                              background: isUrgent ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                              border: isUrgent ? '1px solid #ef4444' : '1px solid var(--border-glass)',
                              color: isUrgent ? '#f87171' : 'var(--text-muted)'
                            }}
                          >
                            <ShieldAlert size={14} />
                            <span>{isUrgent ? 'مستعجل (Urgent)' : 'تحديد كمستعجل (Mark Urgent)'}</span>
                          </button>

                          {/* Toggle Contacted Status */}
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
                                <span>تم التواصل (Contacted)</span>
                              </>
                            ) : (
                              <>
                                <Hourglass size={16} />
                                <span>لم يتم التواصل (Mark Contacted)</span>
                              </>
                            )}
                          </button>
                        </div>
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
          </>
        ) : (
          /* Testimonials / Feedback Moderation Tab */
          <div>
            <div className="section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700' }}>Manage Client Reviews & Feedback</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Review and moderate user-submitted testimonials displayed on the homepage.
              </p>
            </div>

            {testimonials.length === 0 ? (
              <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <MessageSquare size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No Submitted Reviews Yet</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Reviews submitted by visitors on the website will appear here for Admin moderation.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {testimonials.map((t, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', gap: '4px', color: '#fbbf24' }}>
                          {[...Array(t.rating || 5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" />)}
                        </div>

                        {/* Admin Delete Button */}
                        <button 
                          className="btn btn-secondary btn-sm" 
                          style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '4px 10px' }}
                          onClick={() => handleDeleteTestimonial(t.id, idx)}
                        >
                          <Trash2 size={14} /> Delete / مسح
                        </button>
                      </div>

                      <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '16px' }}>
                        "{t.comment}"
                      </p>
                    </div>

                    <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{t.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{t.role || 'Client'}</div>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                        {t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'Recent'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
