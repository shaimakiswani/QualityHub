import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: '16px' }}>
              <div className="logo-icon">
                <ShieldCheck size={24} />
              </div>
              <span>Quality<span style={{ color: 'var(--primary-cyan)' }}>Hub</span></span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '320px', marginBottom: '20px' }}>
              Empowering digital products with zero-defect software quality assurance, automated test suites, and continuous security audits.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a 
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                  onClick={() => setActivePage('home')}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                  onClick={() => setActivePage('services')}
                >
                  Services Preview
                </a>
              </li>
              <li>
                <a 
                  style={{ color: 'var(--text-muted)', textDecoration: 'none', cursor: 'pointer', fontSize: '0.9rem' }}
                  onClick={() => setActivePage('contact')}
                >
                  Request Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>QA Solutions</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <li>Manual Functional QA</li>
              <li>Postman API Validation</li>
              <li>Selenium & Playwright Automation</li>
              <li>JMeter Performance & Stress Tests</li>
              <li>OWASP Security Audits</li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Contact Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--primary-cyan)" /> support@qualityhub.qa
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="var(--primary-cyan)" /> +962 7 7264 410
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={16} color="var(--primary-cyan)" /> www.qualityhub.qa
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} QualityHub QA Engineering. All rights reserved.</p>
          <p>Built for zero-defect software excellence.</p>
        </div>
      </div>
    </footer>
  );
}
