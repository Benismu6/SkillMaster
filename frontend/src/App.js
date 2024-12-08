import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './assets/css/home.css';
import './assets/css/global.css';
import './assets/css/nav-bar.css';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import LockpickingClass from './pages/LockpickingClass';
import AddService from './pages/AddService';
import MessagingInterface from './pages/MessagingInterface';
import ProfilePersonalProvider from './pages/ProfilePersonalProvider';
import ProfilePublicProvider from './pages/ProfilePublicProvider';
import SeekerSettings from './pages/SeekerSettings';
import SkillsDashboard from './pages/SkillsDashboard';
import codingImage from './assets/images/coding.png';
import designImage from './assets/images/design.png';
import financeImage from './assets/images/finance.png';
import guitarImage from './assets/images/guitar.png';
import languageImage from './assets/images/language.png';
import mathImage from './assets/images/math.png';
import pianoImage from './assets/images/piano.png';
import splitscreenImage from './assets/images/splitscreen.png';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navdiv">
          <div className="logo">
            <Link to="/">{scrolled ? 'SM' : 'SkillMaster'}</Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/skills-dashboard">Skills</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/add-service">Provide a Service</Link></li>
          </ul>
          <div className="auth-buttons">
            <button className="button">
              <Link to="/login">Log In</Link>
            </button>
            <button className="button">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </div>
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="hero">
                <div className="hero-content">
                  <h1>Learn and Share Skills Effortlessly</h1>
                  <p className="subheading">Join a community of learners and become a master in your field.</p>
                  <div className="hero-cta">
                    <input type="text" className="search-bar" placeholder="Search for a skill..." />
                    <button className="button get-started">Get Started</button>
                  </div>
                  <div className="hero-features">
                    <div className="feature">
                      <i className="fas fa-book"></i>
                      <p>Interactive Courses</p>
                    </div>
                    <div className="feature">
                      <i className="fas fa-medal"></i>
                      <p>Earn Badges</p>
                    </div>
                    <div className="feature">
                      <i className="fas fa-users"></i>
                      <p>Expert Community</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="image-scroll-section">
                <div className="image-scroll-wrapper">
                  <img src={codingImage} alt="Programming" />
                  <img src={designImage} alt="Designing a logo" />
                  <img src={financeImage} alt="Finance instruction" />
                  <img src={guitarImage} alt="Learning guitar" />
                  <img src={languageImage} alt="Language learning" />
                  <img src={mathImage} alt="Math tutoring" />
                  <img src={pianoImage} alt="Piano learning" />
                  <img src={splitscreenImage} alt="Virtual meeting" />
                </div>
              </div>

              <Testimonials />

              <div id="cta-section">
                <h2>Ready to Start Your Journey?</h2>
                <p>Join our community and start mastering new skills today!</p>
                <button className="cta-button" id="cta-button">Get Started</button>
              </div>
            </div>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/skills-dashboard" element={<SkillsDashboard />} />
        <Route path="/add-service" element={<AddService />} />
        <Route path="/lockpicking-class" element={<LockpickingClass />} />
        <Route path="/messaging" element={<MessagingInterface />} />
        <Route path="/profile/personal-provider" element={<ProfilePersonalProvider />} />
        <Route path="/profile/public-provider" element={<ProfilePublicProvider />} />
        <Route path="/seeker-settings" element={<SeekerSettings />} />
      </Routes>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;