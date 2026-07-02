import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FrontPage.css';

function FrontPage() {
  const navigate = useNavigate();

  return (
    <div className="front-page">
      <header className="front-topbar">
        <Link to="/" className="front-brand" aria-label="AgroTech home">
          <span className="front-brand-mark" aria-hidden>
            🌱
          </span>
          AgroTech
        </Link>
        <nav className="front-nav-links" aria-label="Primary">
          <Link to="/home">Explore</Link>
          <Link to="/agri-tools">Agri Tools</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <button type="button" className="front-nav-cta" onClick={() => navigate('/login')}>
            Login
          </button>
        </nav>
      </header>

      <div className="front-container">
        <div className="glass-card">
          <p className="front-kicker">Agricultural marketplace</p>
          <h1 className="front-title">Grow connections. Trade with confidence.</h1>
          <p className="front-subtitle">
            One platform for farmers and middlemen—purchase requests, market context, and tools built for the field.
          </p>
          <div className="front-buttons">
            <button type="button" className="btn-primary-landing" onClick={() => navigate('/login')}>
              Sign in
            </button>
            <button type="button" className="btn-secondary-landing" onClick={() => navigate('/register/farmer')}>
              Register as Farmer
            </button>
            <button type="button" className="btn-secondary-landing" onClick={() => navigate('/register/middleman')}>
              Register as Middleman
            </button>
          </div>
          <p className="front-trust">
            By continuing you agree to our <Link to="/terms">Terms</Link> and <Link to="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FrontPage;
