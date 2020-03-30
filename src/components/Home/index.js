import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "./home.css";
import Footer from "../Footer";

const Home = () => (
  <>
    <div className="home">
      <div className="content">
        <p className="title-welcom">Welcome to my products page</p>
        <Link to="/products">
          <Button className="go-to-btn" type="primary" size="large">
            CLICK -> Go to products page
          </Button>
        </Link>
      </div>
    </div>
    <div className="fixed-footer">
      <Footer />
    </div>
  </>
);

export default Home;
