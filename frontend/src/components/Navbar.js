import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/nav-bar.css';

function MinimalNavbar() {
  return (
    <nav className="minimal-nav">
      <div className="navdiv">
        <div className="logo">
          <Link to="/">SM</Link>
        </div>
        <div className="nav-actions">
          <Link to="/skills-dashboard" className="nav-link">Home</Link>
          <button className="button">
            <Link to="/login">Sign In</Link>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default MinimalNavbar;
