import React, { useState, useEffect } from 'react';
import { saveTestimonial } from '../firebase';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Terminal, 
  Cpu, 
  Lock, 
  Activity, 
  Users, 
  Clock, 
  FileSpreadsheet, 
  Headphones,
  ArrowRight,
  Star,
  PlusCircle,
  MessageSquare,
  X
} from 'lucide-react';

export default function Home({ setActivePage, onSelectService }) {
  const [userTestimonials, setUserTestimonials] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    role: '',
    rating: 5,
    comment: ''
  });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const loadTestimonials = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('qualityhub_testimonials') || '[]');
      setUserTestimonials(stored.reverse());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    await saveTestimonial(feedbackForm);
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setShowFeedbackModal(false);
      setFeedbackSubmitted(false);
      setFeedbackForm({ name: '', role: '', rating: 5, comment: '' });
      loadTestimonials();
    }, 1500);
  };

  const handleServiceClick = (serviceTitle) => {
    onSelectService(serviceTitle);
    setActivePage('contact');
  };

  const defaultTestimonials = [
    {
      comment: "QualityHub caught critical security vulnerabilities in our payment API prior to launch. Their automated suites saved us hundreds of dev hours!",
      name: "Alex Smith",
      role: "CTO at FinTech Matrix",
      avatar: "AS",
      rating: 5
    },
    {
      comment: "The detailed bug reports with step-by-step videos and HAR logs made it trivial for our engineers to fix regression issues instantly.",
      name: "Maya K.",
      role: "VP of Product at CloudScale",
      avatar: "MK",
      rating: 5
    },
    {
      comment: "Outstanding load and performance testing. They simulated 100k concurrent users and helped us optimize our DB queries before Black Friday.",
      name: "David L.",
      role: "Head of Engineering at ShopFlow",
      avatar: "DL",
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="badge-pill">
            <SparklesIcon /> Next-Gen QA Engineering & Security Audit
          </div>
          <h1 className="hero-title">
            Professional <span className="gradient-text">QA Testing Services</span> for Flawless Software
          </h1>
          <p className="hero-subtitle">
            Eliminate bugs before your users find them. QualityHub delivers robust manual testing, high-speed automated regression suites, API validation, and performance benchmarks.
          </p>

          <div className="hero-actions">
            <button 
              className="btn btn-primary"
              onClick={() => {
                onSelectService('');
                setActivePage('contact');
              }}
            >
              <span>Request Testing</span>
              <ArrowRight size={18} />
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setActivePage('services')}
            >
              <span>View Services</span>
            </button>
          </div>

          <div className="stats-grid glass-panel">
            <div className="stat-card">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Bug Detection Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Projects Verified</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">&lt; 24h</div>
              <div className="stat-label">Fast Audit Delivery</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Dedicated Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Comprehensive <span className="cyan-glow-text">QA Services</span></h2>
            <p className="section-desc">Tailored software testing strategies designed for fast-paced development cycles and enterprise reliability.</p>
          </div>

          <div className="services-grid">
            {/* Manual Testing */}
            <div className="glass-panel service-card">
              <div className="service-icon">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="service-title">Manual Testing</h3>
              <p className="service-desc">
                Exhaustive human exploratory testing, functional validation, smoke tests, and UX compliance checking across web, iOS, and Android.
              </p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleServiceClick('Manual Testing')}
              >
                <span>Request Service</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* API Testing */}
            <div className="glass-panel service-card">
              <div className="service-icon">
                <Terminal size={28} />
              </div>
              <h3 className="service-title">API Testing</h3>
              <p className="service-desc">
                Rigorous REST & GraphQL endpoint validation, status code verification, schema assertion, payload integrity, and Postman suites.
              </p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleServiceClick('API Testing')}
              >
                <span>Request Service</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Automation Testing */}
            <div className="glass-panel service-card">
              <div className="service-icon">
                <Cpu size={28} />
              </div>
              <h3 className="service-title">Automation Testing</h3>
              <p className="service-desc">
                High-speed cross-browser regression test suites powered by Selenium, Playwright, and Cypress integrated right into your CI/CD pipeline.
              </p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleServiceClick('Automation Testing')}
              >
                <span>Request Service</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Security Testing */}
            <div className="glass-panel service-card">
              <div className="service-icon">
                <Lock size={28} />
              </div>
              <h3 className="service-title">Security Testing</h3>
              <p className="service-desc">
                OWASP Top 10 vulnerability scanning, penetration tests, authentication checks, and data encryption auditing.
              </p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleServiceClick('Security Testing')}
              >
                <span>Request Service</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Performance Testing */}
            <div className="glass-panel service-card">
              <div className="service-icon">
                <Activity size={28} />
              </div>
              <h3 className="service-title">Performance Testing</h3>
              <p className="service-desc">
                JMeter load generation, stress testing, bottleneck isolation, and latency optimization under high user traffic surges.
              </p>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => handleServiceClick('Performance Testing')}
              >
                <span>Request Service</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '80px 0', background: 'rgba(255, 255, 255, 0.01)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose <span className="gradient-text">QualityHub</span></h2>
            <p className="section-desc">We don't just find bugs—we accelerate your release confidence with world-class engineering standards.</p>
          </div>

          <div className="features-grid">
            <div className="glass-panel feature-card">
              <div className="feature-icon-wrapper">
                <Users size={24} />
              </div>
              <div>
                <h3 className="feature-title">Experienced QA Engineers</h3>
                <p className="feature-desc">Certified ISTQB professionals with deep domain expertise across fintech, healthcare, and SaaS applications.</p>
              </div>
            </div>

            <div className="glass-panel feature-card">
              <div className="feature-icon-wrapper">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="feature-title">Fast Turnaround Delivery</h3>
                <p className="feature-desc">Overnight test execution cycles ensuring your dev team receives actionable feedback within hours.</p>
              </div>
            </div>

            <div className="glass-panel feature-card">
              <div className="feature-icon-wrapper">
                <FileSpreadsheet size={24} />
              </div>
              <div>
                <h3 className="feature-title">Detailed Bug Reports</h3>
                <p className="feature-desc">Clear repro steps, video recordings, network HAR logs, and Jira ticket integration ready for your devs.</p>
              </div>
            </div>

            <div className="glass-panel feature-card">
              <div className="feature-icon-wrapper">
                <Headphones size={24} />
              </div>
              <div>
                <h3 className="feature-title">24/7 SLA Support</h3>
                <p className="feature-desc">Dedicated testing leads available around the clock to support emergency releases and hotfixes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 className="section-title">Trusted by <span className="cyan-glow-text">Industry Leaders</span></h2>
            <p className="section-desc">Here is what engineering managers and product leads say about our QA partnership.</p>
            
            <button 
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '20px', borderColor: 'var(--primary-cyan)', color: 'var(--primary-cyan)' }}
              onClick={() => setShowFeedbackModal(true)}
            >
              <PlusCircle size={16} />
              <span>Leave Your Review / أضف تقييمك</span>
            </button>
          </div>

          <div className="testimonials-grid">
            {/* Render User-Submitted Testimonials first */}
            {userTestimonials.map((item, idx) => (
              <div key={`user-${idx}`} className="glass-panel testimonial-card" style={{ borderColor: 'rgba(0, 240, 255, 0.4)' }}>
                <div>
                  <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '14px' }}>
                    {[...Array(item.rating || 5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" />)}
                  </div>
                  <p className="testimonial-text">
                    "{item.comment}"
                  </p>
                </div>
                <div className="client-info">
                  <div className="client-avatar" style={{ background: 'var(--gradient-glow)' }}>
                    {item.name ? item.name.substring(0, 2).toUpperCase() : 'QA'}
                  </div>
                  <div>
                    <div className="client-name">{item.name}</div>
                    <div className="client-role">{item.role || 'Verified Client'}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Default Testimonials */}
            {defaultTestimonials.map((item, idx) => (
              <div key={`def-${idx}`} className="glass-panel testimonial-card">
                <div>
                  <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '14px' }}>
                    {[...Array(item.rating)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" />)}
                  </div>
                  <p className="testimonial-text">
                    "{item.comment}"
                  </p>
                </div>
                <div className="client-info">
                  <div className="client-avatar">{item.avatar}</div>
                  <div>
                    <div className="client-name">{item.name}</div>
                    <div className="client-role">{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leave Feedback Modal */}
      {showFeedbackModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(5, 8, 14, 0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '36px', position: 'relative' }}>
            <button 
              onClick={() => setShowFeedbackModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={20} color="var(--primary-cyan)" /> Leave Your Review
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '24px' }}>
              Share your feedback about our QA testing services.
            </p>

            {feedbackSubmitted ? (
              <div style={{ padding: '20px', background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                <CheckCircle2 size={32} style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontWeight: '700' }}>Thank you for your feedback!</h4>
                <p style={{ fontSize: '0.85rem' }}>Your review has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={feedbackForm.name} 
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Sarah J."
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Role / Company Name</label>
                  <input 
                    type="text" 
                    value={feedbackForm.role} 
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, role: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Product Lead at Startup"
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label className="form-label">Rating</label>
                  <select 
                    value={feedbackForm.rating}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, rating: Number(e.target.value) })}
                    className="form-select"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Excellent)</option>
                    <option value={4}>⭐⭐⭐⭐ 4 Stars (Very Good)</option>
                    <option value={3}>⭐⭐⭐ 3 Stars (Average)</option>
                    <option value={2}>⭐⭐ 2 Stars (Needs Improvement)</option>
                    <option value={1}>⭐ 1 Star (Poor)</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: '24px' }}>
                  <label className="form-label">Your Feedback / Review *</label>
                  <textarea 
                    rows={4}
                    required
                    value={feedbackForm.comment}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, comment: e.target.value })}
                    className="form-textarea"
                    placeholder="Describe your experience working with QualityHub..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Review / إرسال التقييم
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Contact CTA Banner */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', background: 'var(--gradient-glow)' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px' }}>Ready to Elevate Your Software Quality?</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 32px' }}>
              Book a custom QA audit or get your test coverage proposal in less than 24 hours.
            </p>
            <button 
              className="btn btn-primary"
              onClick={() => {
                onSelectService('');
                setActivePage('contact');
              }}
            >
              <span>Get Started Now</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function SparklesIcon() {
  return <Zap size={14} color="var(--primary-cyan)" />;
}
