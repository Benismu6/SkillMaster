import React from 'react';
import '../assets/css/global.css'; // Global styles
import '../assets/css/public-profile-styles.css'; // Page-specific styles

function ProfilePublicProvider() {
  return (
    <div className="public-profile-wrapper">
      <div className="profile-header">
        <img
          src="../assets/images/provider-profile-example.png"
          alt="Provider Photo"
          className="profile-photo"
        />
        <div className="profile-info">
          <h2>[Provider Name]</h2>
          <p>
            <strong>Specialty:</strong> [Skill Specialty]
          </p>
          <p>
            <strong>Member Since:</strong> [Date]
          </p>
          <p>
            <strong>Average Rating:</strong> [Rating]
          </p>
        </div>
      </div>

      <div className="about-section">
        <h3>About Me</h3>
        <p>[Brief description about the provider's background and experience]</p>
      </div>

      <div className="classes-offered-section">
        <h3>Classes Offered</h3>
        <div className="class-card">
          <h4>Class Title 1</h4>
          <p>
            <strong>Next Session:</strong> [Date & Time]
          </p>
          <p>
            <strong>Duration:</strong> [Duration]
          </p>
          <button className="button enroll-btn">Enroll</button>
        </div>
        <div className="class-card">
          <h4>Class Title 2</h4>
          <p>
            <strong>Next Session:</strong> [Date & Time]
          </p>
          <p>
            <strong>Duration:</strong> [Duration]
          </p>
          <button className="button enroll-btn">Enroll</button>
        </div>
      </div>

      <div className="reviews-section">
        <h3>Reviews</h3>
        <div className="review">
          <p>
            <strong>Jane Doe:</strong> "Excellent class, very engaging and informative!"
          </p>
        </div>
        <div className="review">
          <p>
            <strong>John Smith:</strong> "Highly recommend, learned a lot and had fun!"
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePublicProvider;
