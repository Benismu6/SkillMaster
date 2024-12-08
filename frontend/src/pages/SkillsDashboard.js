import React from 'react';
import '../assets/css/global.css'; // Global styles
import '../assets/css/skills-dashboard.css'; // Page-specific styles

function SkillsDashboard() {
  const categories = ['Programming', 'Design', 'Music', 'Marketing'];
  const skills = [
    {
      image: '../assets/images/coding.png',
      title: 'Web Development',
      description: 'Learn to build responsive websites from scratch.',
      learners: '5,000+',
    },
    {
      image: '../assets/images/design.png',
      title: 'Graphic Design',
      description: 'Master the art of visual storytelling and design.',
      learners: '3,200+',
    },
    {
      image: '../assets/images/piano.png',
      title: 'Playing Piano',
      description: 'Learn to play the piano from basic to advanced levels.',
      learners: '4,500+',
    },
    {
      image: '../assets/images/guitar.png',
      title: 'Playing Guitar',
      description: 'Master guitar techniques and play your favorite songs.',
      learners: '6,000+',
    },
    {
      image: '../assets/images/finance.png',
      title: 'Finance Basics',
      description: 'Understand the fundamentals of personal and business finance.',
      learners: '2,800+',
    },
    {
      image: '../assets/images/language.png',
      title: 'Learning Languages',
      description: 'Become fluent in new languages through immersive lessons.',
      learners: '5,300+',
    },
    {
      image: '../assets/images/math.png',
      title: 'Math Mastery',
      description: 'Improve your math skills with step-by-step explanations.',
      learners: '7,100+',
    },
  ];

  return (
    <div>
      <nav className="minimal-nav">
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
        <a href="#">Sign Out</a>
      </nav>

      <header className="skills-header">
        <h1>Explore Our Skills</h1>
        <p>Discover new opportunities and master new skills with our expert-led courses.</p>
        <input type="text" placeholder="Search for a skill..." className="search-bar" />
      </header>

      <section className="categories">
        <h2>Categories</h2>
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category}>
              <a href="#">{category}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="skills-grid-wrapper">
        <h2>All Skills</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <img src={skill.image} alt={skill.title} />
              <h3>{skill.title}</h3>
              <div className="skill-details">
                <p>{skill.description}</p>
                <p>Engaged by: {skill.learners} learners</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SkillsDashboard;
