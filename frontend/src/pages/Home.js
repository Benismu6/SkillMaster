import React from 'react';
import '../assets/css/global.css'; // For global styling
import '../assets/css/nav-bar.css'; // Navbar styles
import '../assets/css/footer.css'; // Footer styles
import '../assets/css/home.css'; // Page-specific styles

function Home() {
  return (
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

          <div className="scroll-hint">
            <i className="fas fa-arrow-down"></i>
          </div>
        </div>
      </div>

      <div className="image-scroll-section">
        <div className="image-scroll-wrapper">
          <img src="../assets/images/coding.png" alt="Programming" />
          <img src="../assets/images/design.png" alt="Designing a logo" />
          <img src="../assets/images/finance.png" alt="Finance instruction" />
          <img src="../assets/images/guitar.png" alt="Learning guitar" />
          <img src="../assets/images/language.png" alt="Language learning" />
          <img src="../assets/images/math.png" alt="Math tutoring" />
          <img src="../assets/images/piano.png" alt="Piano learning" />
          <img src="../assets/images/splitscreen.png" alt="Virtual meeting" />
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
        <h5 className="explore-more"><a href="#">+ Explore More</a></h5>
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

      <div id="testimonials-section">
        <h2>What our users are saying</h2>
        <div className="gallery">
          <div className="gallery-cell">
            <img src="../assets/images/profile4.png" alt="User 1" />
            <p>"This platform has changed the way I learn new skills off the pitch!"</p>
            <p className="user-name">- L. Messi</p>
          </div>
          <div className="gallery-cell">
            <img src="../assets/images/profile2.png" alt="User 2" />
            <p>"Not many people know that this platform is where I got my acting skills."</p>
            <p className="user-name">- The Rock</p>
          </div>
          <div className="gallery-cell">
            <img src="../assets/images/profile3.png" alt="User 3" />
            <p>"This platform helped me take my bars to the next level!"</p>
            <p className="user-name">- champagnepapi</p>
          </div>
        </div>
      </div>

      <div id="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join our community and start mastering new skills today!</p>
        <button href="#" className="cta-button" id="cta-button">Get Started</button>
      </div>
    </div>
  );
}

export default Home;
