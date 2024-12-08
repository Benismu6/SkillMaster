import React, { useEffect, useState } from 'react';
import './assets/css/home.css';
import './assets/css/global.css';
import './assets/css/nav-bar.css';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
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
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navdiv">
          <div className="logo">
            <a href="#">{scrolled ? 'SM' : 'SkillMaster'}</a>
          </div>
          <ul className="nav-links">
            <li><a href="/skills-dashboard">Skills</a></li>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/add-service">Provide a Service</a></li>
          </ul>
          <div className="auth-buttons">
            <button className="button">
              <a href="/sign-in">Log In</a>
            </button>
            <button className="button">
              <a href="/sign-up">Sign Up</a>
            </button>
          </div>
        </div>
      </nav>

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

      <div id="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <i className="fas fa-user-plus"></i>
            <h3>Sign Up</h3>
            <p>Create an account and join our learning community.</p>
          </div>
          <div className="step">
            <i className="fas fa-search"></i>
            <h3>Explore Skills</h3>
            <p>Choose from a wide range of skills to master.</p>
          </div>
          <div className="step">
            <i className="fas fa-trophy"></i>
            <h3>Earn Badges</h3>
            <p>Track your progress and earn rewards as you learn.</p>
          </div>
        </div>
      </div>

      <div className="cta-seeker-provider">
        <h2>Join Our Community</h2>
        <p>Whether you're looking to learn a new skill or share your expertise, we have a place for you.</p>
        <div className="cta-buttons">
          <button className="button seeker-button" id="learn-new-skill-button">Learn a new skill</button>
          <button className="button provider-button" id="become-provider">Provide a Service</button>
        </div>
      </div>

      <div id="skills-section">
        <h2>Explore Popular Skills</h2>
        <div id="skills-grid">
          <button className="skill-card" id="popular1">Lock Picking</button>
          <button className="skill-card" id="popular2">Programming</button>
          <button className="skill-card" id="popular3">Playing Piano</button>
          <button className="skill-card" id="popular4">UI/UX Design</button>
          <button className="skill-card" id="popular5">Sales</button>
          <button className="skill-card" id="popular6">Copywriting</button>
          <button className="skill-card" id="popular7">Marketing</button>
          <button className="skill-card" id="popular8">Public Speaking</button>
        </div>
        <div className="explore-more-container">
          <button className="cta-button explore-more">+ Explore More</button>
        </div>
      </div>

      <div id="community-section">
        <h2>Community</h2>
        <div className="community-container">
          <div className="discussion-forum">
            <h3>Discussion Forum</h3>
            <p>Join the conversation! Ask questions, share tips, or help others master new skills.</p>
            <button className="button" id="forum-button">Visit Forum</button>
          </div>
          <div className="leaderboard">
            <h3>Top Contributors</h3>
            <ul className="leaderboard-list">
              <li><strong>Jane Doe</strong> - 150 Points</li>
              <li><strong>John Smith</strong> - 130 Points</li>
              <li><strong>Alex Lee</strong> - 120 Points</li>
            </ul>
            <p>Contribute to discussions and climb the leaderboard!</p>
          </div>
        </div>
      </div>

      <Testimonials />

      <div id="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join our community and start mastering new skills today!</p>
        <button href="#" className="cta-button" id="cta-button">Get Started</button>
      </div>

      <Footer />
    </div>
  );
}

export default App;
