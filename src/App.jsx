import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Bookings from './components/pages/Bookings';
import Professionals from './components/pages/Professionals';
import Customers from './components/pages/Customers';
import Services from './components/pages/Services';
import Payments from './components/pages/Payments';
import Analytics from './components/pages/Analytics';
import ServiceConfig from './components/pages/ServiceConfig';
import Reports from './components/pages/Reports';
import Settings from './components/pages/Settings';
import Login from './components/Login';


const PAGES = {
  dashboard: Dashboard,
  bookings: Bookings,
  professionals: Professionals,
  customers: Customers,
  services: Services,
  payments: Payments,
  analytics: Analytics,
  'service-config': ServiceConfig,
  reports: Reports,
  settings: Settings,
};

const SESSION_KEY = 'uniteoman_admin_session';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  // Restore a "keep me signed in" session on load.
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

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setActivePage('dashboard');
  };

  if (checkingSession) return null; // avoids a login-page flash while checking storage

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const ActivePageComponent = PAGES[activePage] || Dashboard;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F8FA]">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      <ActivePageComponent />
    </div>
  );
}

export default App;