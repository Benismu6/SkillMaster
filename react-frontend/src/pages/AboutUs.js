import React from 'react';
import '../assets/css/about-us.css';

function AboutUs() {
  return (
    <div>
      <section className="about-section">
        <h1>About Us</h1>
        <p>
          Welcome to SkillMaster, your go-to platform for discovering, sharing, learning, and teaching a wide range of skills.
          Our mission is to empower people to acquire new skills and share their knowledge with the world.
        </p>

        <h2>Our Story</h2>
        <p>
          Founded in 2024, SkillMaster started as a simple idea to connect experts and learners in a community-driven
          environment. With a focus on simplicity and user-friendliness, we’ve built a platform that allows people to
          grow their skillsets and achieve mastery in various fields.
        </p>

        <h2>Our Team</h2>
        <div className="team-section">
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Angel Ocadiz" />
            <h3>Angel Ocadiz</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="John Doe" />
            <h3>John Doe</h3>
            <p>CTO</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Jane Smith" />
            <h3>Jane Smith</h3>
            <p>Head of Marketing</p>
          </div>
        </div>

        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Community:</strong> We believe in the power of collaboration and learning from one another.
          </li>
          <li>
            <strong>Accessibility:</strong> Knowledge should be accessible to everyone, regardless of background.
          </li>
          <li>
            <strong>Growth:</strong> We are committed to personal and professional growth for all our users.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default AboutUs;
