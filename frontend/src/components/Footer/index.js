import React from 'react';
import './Footer.css';
export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="left">
          © 2023 Firebnb &nbsp;|&nbsp; AirBnB clone by &nbsp;
          <span>Jamal Sheriff</span>
        </div>

        <div className="right">
          <span className="social">
            <a
              href="https://github.com/TraderCodes"
              target="blank"
              style={{ textDecoration: 'none' }}
            >
              &nbsp;<i className="fa-brands fa-github"></i>
              &nbsp; GitHub | tradercodes &nbsp;
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
