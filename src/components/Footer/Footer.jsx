// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>JobPortal</h3>
            <p>Connecting talent with opportunity</p>
          </div>
          
          <div className="footer-section">
            <h4>For Candidates</h4>
            <ul>
              <li><a href="#">Browse Jobs</a></li>
              <li><a href="#">Candidate Dashboard</a></li>
              <li><a href="#">Job Alerts</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>For Employers</h4>
            <ul>
              <li><a href="#">Post a Job</a></li>
              <li><a href="#">Browse Candidates</a></li>
              <li><a href="#">Employer Dashboard</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>info@jobportal.com</p>
            <p>+91 98123-49567</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;