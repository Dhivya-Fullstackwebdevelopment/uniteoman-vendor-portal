import React, { useState, useEffect } from 'react';
import { useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Bookings from './components/pages/Bookings';
import Professionals from './components/pages/Professionals';
import Customers from './components/pages/Customers';
import Services from './components/pages/Services';
import Payments from './components/pages/Payments';
import Analytics from './components/pages/Analytics';
import Reports from './components/pages/Reports';
import Settings from './components/pages/Settings';
import Login from './components/Login';
import Credits from './components/pages/Credits';
import LiveMap from './components/pages/LiveMap';
import Reviews from './components/pages/Reviews';
import Notifications from './components/pages/Notifications';
import { Toaster } from 'react-hot-toast';

const PAGES = {
  dashboard: Dashboard,
  bookings: Bookings,
  services: Services,
  payments: Payments,
  credits: Credits,
  'live-map': LiveMap,
  reviews: Reviews,
  analytics: Analytics,
  notifications: Notifications,
  settings: Settings,
};

const SESSION_KEY = 'uniteoman_admin_session';

// Move ScrollToTop outside and make it a proper component
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

// Main App content component
function AppContent({ isAuthenticated, setIsAuthenticated, setActivePage, activePage }) {
  const ActivePageComponent = PAGES[activePage] || Dashboard;

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setActivePage('dashboard');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F8FA]">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      <ActivePageComponent />
      <ScrollToTop />
      <Toaster 
        position="top-right" 
        toastOptions={{
          style: { fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px' }
        }} 
      />
    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) setIsAuthenticated(true);
    setCheckingSession(false);
  }, []);

  const handleLogin = ({ email, remember }) => {
    if (remember) {
      localStorage.setItem(SESSION_KEY, email);
    }
    setIsAuthenticated(true);
  };

  if (checkingSession) return null;

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <AppContent 
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setActivePage={setActivePage}
        activePage={activePage}
      />
    </Router>
  );
}

export default App;