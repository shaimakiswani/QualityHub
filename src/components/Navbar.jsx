import React from 'react';
import { ShieldCheck, Sparkles, Send } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onSelectService }) {
  return (
    <nav className="navbar">
      <div className="container nav-wrapper">
        <a 
          href="#home" 
          className="brand-logo"
          onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
        >
          <div className="logo-icon">
            <ShieldCheck size={24} />
          </div>
          <span>Quality<span style={{ color: 'var(--primary-cyan)' }}>Hub</span></span>
        </a>

        <ul className="nav-links">
          <li>
            <a 
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => setActivePage('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${activePage === 'services' ? 'active' : ''}`}
              onClick={() => setActivePage('services')}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
              onClick={() => setActivePage('contact')}
            >
              Contact / Request
            </a>
          </li>
        </ul>

        <div className="nav-cta">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => {
              if (onSelectService) onSelectService('');
              setActivePage('contact');
            }}
          >
            <Send size={16} />
            <span>Request Testing</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
