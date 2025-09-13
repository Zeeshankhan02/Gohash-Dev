import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">

          {/* Quick Links */}
          <div className="footer-section">
            <h6 className="footer-heading">Quick Links</h6>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="/general" className="footer-link">General News</a></li>
              <li><a href="/headlines" className="footer-link">Daily Bulletin</a></li>
              <li><a href="/apply-for-ads" className="footer-link">apply for ads</a></li>
        
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h6 className="footer-heading">Categories</h6>
            <ul className="footer-links">
              <li><a href="/general" className="footer-link">genral News</a></li>
              <li><a href="/headlines" className="footer-link">dailyBulletin</a></li>
              <li><a href="/apply-for-ads" className="footer-link">apply for ads</a></li>
        
            </ul>
          </div>
          
          

          {/* Contact Info */}
          <div className="footer-section">
            <h6 className="footer-heading">Contact Us</h6>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope contact-icon"></i>
                <span>info@gohash.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone contact-icon"></i>
                <span>+91 123 456 7890</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt contact-icon"></i>
                <span>Gulbarga, Karnataka</span>
              </div>
            </div>
          </div>


               <div className="footer-section">
            <h6 className="footer-heading">Follow Us</h6>
            <ul className="footer-links">
              <li><a href="https://www.instagram.com/gohash_network/" className="footer-link"><i class=" fa-brands fa-instagram"></i> instagram</a></li>
              
              <li><a href="https://www.facebook.com/gohash.tv/" className="footer-link">  
               <i class="fa-brands fa-facebook"></i> Facebook</a></li>
              <li><a href="https://www.youtube.com/@gohash22" className="footer-link">   <i class="fa-brands fa-youtube"></i> youtube</a></li>
              
            </ul>
          </div>

                  
         

        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="copyright">
            <p>© 2025 Gohash Gulbarga. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;