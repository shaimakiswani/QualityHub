import { ShieldCheck, Sparkles, Send, Database, LogOut } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onSelectService }) {
  const handleExitAdmin = () => {
    window.location.hash = '';
    setActivePage('home');
  };

  return (
    <nav className="navbar">
      <div className="container nav-wrapper">
        <a 
          href="#home" 
          className="brand-logo"
          onClick={(e) => { 
            e.preventDefault(); 
            if (activePage === 'admin') window.location.hash = '';
            setActivePage('home'); 
          }}
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
              onClick={() => {
                if (activePage === 'admin') window.location.hash = '';
                setActivePage('home');
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${activePage === 'services' ? 'active' : ''}`}
              onClick={() => {
                if (activePage === 'admin') window.location.hash = '';
                setActivePage('services');
              }}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
              onClick={() => {
                if (activePage === 'admin') window.location.hash = '';
                setActivePage('contact');
              }}
            >
              Contact / Request
            </a>
          </li>
        </ul>

        <div className="nav-cta">
          {activePage === 'admin' ? (
            <button 
              className="btn btn-secondary btn-sm"
              style={{ borderColor: 'rgba(239, 68, 68, 0.5)', color: '#f87171', background: 'rgba(239, 68, 68, 0.1)' }}
              onClick={handleExitAdmin}
            >
              <LogOut size={16} />
              <span>Exit Admin / خروج</span>
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
}
