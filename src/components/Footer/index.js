import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => (
  <div className="footer">
    <div className="part">
      <Link to="/">
        <span className="footer-link">Home</span>
      </Link>
      <Link to="/products">
        <span className="footer-link">Products</span>
      </Link>
    </div>
    <div className="part">
      <a href="https://github.com/nthongngoc" target="blank">
        <span className="footer-link">Hong Ngoc's github</span>
      </a>
      <a href="https://www.linkedin.com/in/nthongngoc" target="blank">
        <span className="footer-link">Hong Ngoc's Linkedin</span>
      </a>
    </div>
  </div>
);

export default Footer;
