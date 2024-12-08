import React from 'react';
import '../assets/css/global.css'; // Global styles
import '../assets/css/p-settings-styles.css'; // Page-specific styles

function ProviderSettings() {
  return (
    <div className="settings-wrapper">
      <h2>Settings</h2>
      <div className="settings-form">
        <section className="profile-info">
          <h3>Profile Information</h3>
          <p>
            <strong>Name:</strong> Jane Smith
          </p>
          <p>
            <strong>Email:</strong> jane.smith@example.com
          </p>
          <p>
            <strong>Professional Bio:</strong> Experienced UI/UX Designer with over 5 years of experience.
          </p>
          <p>
            <strong>Member Since:</strong> March 2021
          </p>
          <p className="update-info">
            Is your information up to date? <a href="#">Update Profile</a>
          </p>
        </section>

        <section className="service-settings">
          <h3>Service Settings</h3>
          <p>
            <strong>Services Offered:</strong> UI/UX Design Tutorials, Web Design Workshops
          </p>
          <p>
            <strong>Availability:</strong> Mon-Fri, 9 AM - 5 PM
          </p>
          <p>
            <strong>Pricing:</strong> $50/hour
          </p>
          <p className="update-info">
            <a href="#">Update Service Details</a>
          </p>
        </section>

        <section className="credentials">
          <h3>Credentials & Verification</h3>
          <p>No uploaded certificates. <a href="#">Upload Now</a></p>
          <p className="note">Note: All credentials will be reviewed and verified.</p>
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

export default ProviderSettings;
