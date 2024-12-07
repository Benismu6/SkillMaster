import React from 'react';
import '../assets/css/global.css'; // Global styles
import '../assets/css/s-settings-styles.css'; // Page-specific styles

function SeekerSettings() {
  return (
    <div className="settings-wrapper">
      <h2>Settings</h2>
      <div className="settings-form">
        <section className="profile-info">
          <h3>Profile Information</h3>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> john.doe@example.com
          </p>
          <p>
            <strong>Member Since:</strong> January 2022
          </p>
          <p className="update-info">
            Is your information up to date? <a href="#">Update Profile</a>
          </p>
        </section>

        <section className="notification-preferences">
          <h3>Notification Preferences</h3>
          <label>
            <input type="checkbox" checked /> Email Notifications
          </label>
          <label>
            <input type="checkbox" /> SMS Notifications
          </label>
        </section>

        <section className="privacy-settings">
          <h3>Privacy Settings</h3>
          <label>
            <input type="checkbox" checked /> Allow others to view my profile
          </label>
          <label>
            <input type="checkbox" /> Hide my activity
          </label>
        </section>

        <section className="account-management">
          <h3>Account Management</h3>
          <button type="button" className="button">
            Change Password
          </button>
          <button type="button" className="button">
            Deactivate Account
          </button>
          <button type="button" className="button danger">
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}

export default SeekerSettings;