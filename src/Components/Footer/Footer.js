import React from "react";

import "./Footer.css";

function Footer() {
  return (
    <div className="footerParentDiv">
      <div className="content">
        <div>
          <div className="heading">
            <p>Popular Locations</p>
          </div>
          <div className="list">
            <ul>
              <li>New Delhi</li>
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>About Us</p>
          </div>
          <div className="list">
            <ul>
              <li>About OneTap</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="heading">
            <p>OneTap</p>
          </div>
          <div className="list">
            <ul>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
