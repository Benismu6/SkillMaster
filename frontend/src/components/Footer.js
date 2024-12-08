import React from 'react';
import { FaTwitter, FaInstagram, FaPinterest, FaLinkedin } from 'react-icons/fa';
import '../assets/css/footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <div className="footer-elements">
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <h5><a href="mailto:support@skillmaster.com">support@skillmaster.com</a></h5>
            <h5><a href="tel:123-456-7890">123-456-7890</a></h5>
          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <h5><a href="#">Home</a></h5>
            <h5><a href="/about-us">About Us</a></h5>
            <h5><a href="#">Privacy Policy</a></h5>
          </div>
          <div className="footer-social">
            <h3>Social Media</h3>
            <div className="social-icons">
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Pinterest"><FaPinterest /></a>
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <div className="footer-subscribe">
          <h5>Subscribe to our Newsletter:</h5>
          <input type="text" placeholder="Email" />
          <button type="submit">Subscribe</button>
        </div>

        <div className="footer-copyright">
          <h5>Copyright © 2024 Skill Share. All rights reserved.</h5>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
