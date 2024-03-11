// Footer.js
import React from 'react';
import './footer.css'; // Make sure this path is correct

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer-bottom">
        For more information,  
        <a href="https://sdgs.un.org/goals/goal12" className="footer-link"> visit the UN SDGs site</a>.
      </p>
      <div className="footer-content">
        <a href="mailto:contactus@FurnishU.com" className="footer-info email-link">
          <i className="fas fa-envelope"></i> contactus@FurnishU.com
        </a>
        <span className="footer-info">&copy; FurnishU 2024</span>
      </div>
    </footer>
  );
}
