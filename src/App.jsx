import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import AdminRequests from './pages/AdminRequests';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    return window.location.hash === '#admin' ? 'admin' : 'home';
  });
  const [selectedService, setSelectedService] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setActivePage('admin');
      } else if (window.location.hash === '' && activePage === 'admin') {
        setActivePage('home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activePage]);

  const renderPage = () => {
    switch (activePage) {
      case 'services':
        return (
          <Services 
            setActivePage={setActivePage} 
            onSelectService={setSelectedService} 
          />
        );
      case 'contact':
        return (
          <Contact 
            selectedService={selectedService} 
          />
        );
      case 'admin':
        return (
          <AdminRequests 
            setActivePage={setActivePage} 
          />
        );
      case 'home':
      default:
        return (
          <Home 
            setActivePage={setActivePage} 
            onSelectService={setSelectedService} 
          />
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onSelectService={setSelectedService}
      />
      <main style={{ flexGrow: 1 }}>
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
