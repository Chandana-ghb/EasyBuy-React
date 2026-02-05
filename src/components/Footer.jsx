import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3>EasyBuy 🛒</h3>
        <p>© {new Date().getFullYear()} EasyBuy. All rights reserved.</p>

        <div className="footer-links">
          <span>Privacy Policy</span>
          <span>Terms & Conditions</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
