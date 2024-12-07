import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/nav-bar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="logo">
          <Link to="/">SkillMaster</Link>
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/skills-dashboard">Skills</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/add-service">Provide a Service</Link>
          </li>
          <li>
            <button className="button" id="sign-in">
              <Link to="/login">Sign In</Link>
            </button>
          </li>
          <li>
            <button className="button" id="sign-up">
              <Link to="/sign-up">Sign Up</Link>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
