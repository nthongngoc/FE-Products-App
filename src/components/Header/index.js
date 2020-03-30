import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => (
  <div className="header">
    <Link to="/">
      <span className="header-link">Home</span>
    </Link>
    <Link to="/products">
      <span className="header-link">Products</span>
    </Link>
  </div>
);

export default Header;
