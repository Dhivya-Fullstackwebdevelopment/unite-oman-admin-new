import React, { useState, useEffect } from 'react';
import { useLocation, BrowserRouter as Router } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'; // 👈 FIX: import Toaster and toast

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
import VendorVerification from './components/pages/VendorVerifications';
import BookingControl from './components/pages/BookingControl';
import LiveMap from './components/pages/LiveMap';
import CreditsPlans from './components/pages/CreditPlans';
import Disputes from './components/pages/Disputes';
import Promotions from './components/pages/Promotions';
import Reviews from './components/pages/Reviews';
import Pricing from './components/pages/Pricing';

const PAGES = {
  dashboard: Dashboard,
  bookings: Bookings,
  'vendor-verification': VendorVerification,
  'booking-control': BookingControl,
  'live-map': LiveMap,
  // professionals: Professionals,
  // customers: Customers,
  // services: Services,
  payments: Payments,
  'credits-plans': CreditsPlans,
  analytics: Analytics,
  disputes: Disputes,
  promotions: Promotions,
  reviews: Reviews,
  pricing: Pricing,
  // 'service-config': ServiceConfig,
  // reports: Reports,
  settings: Settings,
};

const SESSION_KEY = 'uniteoman_admin_session';

// ScrollToTop component
function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

// Main App content component
function AppContent({ setIsAuthenticated, setActivePage, activePage }) {
  const ActivePageComponent = PAGES[activePage] || Dashboard;

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setIsAuthenticated(false);
    setActivePage('dashboard');
    // 👇 Show logout toast
    toast.error('Logged out successfully', {
      style: {
        border: '1px solid #ff4d4f',
        padding: '16px',
        color: '#ff4d4f',
      },
      icon: '👋',
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F8FA]">
      <Sidebar activePage={activePage} onNavigate={setActivePage} onLogout={handleLogout} />
      <ActivePageComponent />
      <ScrollToTop />
      {/* Global Toaster with custom styling */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '14px',
            borderRadius: '10px',
            background: '#ffffff',
            color: '#1e293b',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          },
          success: {
            duration: 4000,
            style: {
              background: '#ecfdf5',
              border: '1px solid #10b981',
              color: '#065f46',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#fef2f2',
              border: '1px solid #ef4444',
              color: '#991b1b',
            },
          },
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
    // 👇 Show login success toast
    toast.success(`Welcome back, ${email || 'Admin'}!`, {
      duration: 4000,
      style: {
        background: '#d1fae5',
        color: '#065f46',
        fontWeight: '500',
      },
      icon: '✅',
    });
  };

  if (checkingSession) return null;

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <AppContent
        setIsAuthenticated={setIsAuthenticated}
        setActivePage={setActivePage}
        activePage={activePage}
      />
    </Router>
  );
}

export default App;