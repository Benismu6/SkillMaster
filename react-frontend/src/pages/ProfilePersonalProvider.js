import React from 'react';
import '../assets/css/global.css'; // Global styles
import '../assets/css/personal-styles.css'; // Page-specific styles

function ProfilePersonalPage() {
  return (
    <div className="provider-profile-wrapper">
      <h2>Welcome, [Provider Name]</h2>
      <div className="profile-overview">
        <img
          src="../assets/images/provider-profile-example.png"
          alt="Provider Photo"
          className="profile-photo"
        />
        <div className="profile-details">
          <h3>[Provider Name]</h3>
          <p>
            <strong>Member Since:</strong> [Date]
          </p>
          <p>
            <strong>Total Classes Taught:</strong> [Number]
          </p>
          <p>
            <strong>Students Taught:</strong> [Number]
          </p>
          <p>
            <strong>Average Rating:</strong> [Rating]
          </p>
        </div>
      </div>

      <div className="credentials-section">
        <h3>Your Credentials</h3>
        <p>[List of Credentials or Certifications]</p>
      </div>

      <div className="classes-section">
        <h3>Manage Your Classes</h3>
        <button className="button add-class-btn">Add New Class</button>
        <div className="class-list">
          <div className="class-item">
            <h4>Class Title</h4>
            <p>
              <strong>Enrolled Students:</strong> [Number]
            </p>
            <p>
              <strong>Next Session:</strong> [Date & Time]
            </p>
            <button className="button manage-btn">Manage Class</button>
          </div>
          <div className="class-item">
            <h4>Class Title</h4>
            <p>
              <strong>Enrolled Students:</strong> [Number]
            </p>
            <p>
              <strong>Next Session:</strong> [Date & Time]
            </p>
            <button className="button manage-btn">Manage Class</button>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Your Statistics</h3>
        <p>
          <strong>Classes Completed:</strong> [Number]
        </p>
        <p>
          <strong>Positive Feedback:</strong> [Percentage]
        </p>
        <p>
          <strong>Total Earnings:</strong> [Amount]
        </p>
      </div>
    </div>
  );
}

export default ProfilePersonalPage;
