import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate('/');
  };

  if (!user) return null;

  const purchaseRoute = user.role === 'MIDDLEMAN' ? '/purchase/middleman' : '/purchase';
  const transactionRoute = user.role === 'MIDDLEMAN' ? '/transactions/middleman' : '/transactions';
  const accountRoute = user.role === 'MIDDLEMAN' ? '/account/middleman' : '/account/farmer';
  const dashboardRoute = user.role === 'MIDDLEMAN' ? '/middleman' : '/farmer';

  const linkProps = {
    onClick: () => setMenuOpen(false),
  };

  return (
    <nav className="app-navbar-outer" aria-label="Main">
      <div className="app-navbar">
      <Link to="/home" className="app-navbar-logo">
        <span className="app-navbar-logo-mark" aria-hidden>
          🌱
        </span>
        AgroTech
      </Link>

      <div className="app-navbar-wrap">
        <button
          type="button"
          className="app-navbar-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul id="main-nav-menu" className={`app-navbar-links${menuOpen ? ' is-open' : ''}`}>
          <li>
            <Link to="/agri-tools" {...linkProps}>
              Agri Tools
            </Link>
          </li>
          <li>
            <Link to="/market-data" {...linkProps}>
              Market Data
            </Link>
          </li>
          <li>
            <Link to="/demographics" {...linkProps}>
              Demographics
            </Link>
          </li>
          <li>
            <Link to="/about" {...linkProps}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" {...linkProps}>
              Contact
            </Link>
          </li>
          <li>
            <Link to={purchaseRoute} {...linkProps}>
              Purchase Requests
            </Link>
          </li>
          <li>
            <Link to={transactionRoute} {...linkProps}>
              Transactions
            </Link>
          </li>
          <li>
            <Link to={dashboardRoute} {...linkProps}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={accountRoute} {...linkProps}>
              Account
            </Link>
          </li>
          <li>
            <button type="button" className="nav-link-btn app-navbar-signout" onClick={handleLogout}>
              Sign out
            </button>
          </li>
        </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
