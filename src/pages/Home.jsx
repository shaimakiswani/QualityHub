import React from 'react';
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
  Star
} from 'lucide-react';

export default function Home({ setActivePage, onSelectService }) {
  const handleServiceClick = (serviceTitle) => {
    onSelectService(serviceTitle);
    setActivePage('contact');
  };

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
          <div className="section-header">
            <h2 className="section-title">Trusted by <span className="cyan-glow-text">Industry Leaders</span></h2>
            <p className="section-desc">Here is what engineering managers and product leads say about our QA partnership.</p>
          </div>

          <div className="testimonials-grid">
            <div className="glass-panel testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" />)}
                </div>
                <p className="testimonial-text">
                  "QualityHub caught critical security vulnerabilities in our payment API prior to launch. Their automated suites saved us hundreds of dev hours!"
                </p>
              </div>
              <div className="client-info">
                <div className="client-avatar">AS</div>
                <div>
                  <div className="client-name">Alex Smith</div>
                  <div className="client-role">CTO at FinTech Matrix</div>
                </div>
              </div>
            </div>

            <div className="glass-panel testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" />)}
                </div>
                <p className="testimonial-text">
                  "The detailed bug reports with step-by-step videos and HAR logs made it trivial for our engineers to fix regression issues instantly."
                </p>
              </div>
              <div className="client-info">
                <div className="client-avatar">MK</div>
                <div>
                  <div className="client-name">Maya K.</div>
                  <div className="client-role">VP of Product at CloudScale</div>
                </div>
              </div>
            </div>

            <div className="glass-panel testimonial-card">
              <div>
                <div style={{ display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" />)}
                </div>
                <p className="testimonial-text">
                  "Outstanding load and performance testing. They simulated 100k concurrent users and helped us optimize our DB queries before Black Friday."
                </p>
              </div>
              <div className="client-info">
                <div className="client-avatar">DL</div>
                <div>
                  <div className="client-name">David L.</div>
                  <div className="client-role">Head of Engineering at ShopFlow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
