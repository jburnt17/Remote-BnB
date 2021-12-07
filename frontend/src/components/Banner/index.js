import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";


function Banner() {
  return (
    <div className="banner-con">
      <div className="hero-text-con">
        <div className='go-wild-con'>
          <p className="hero-text" id="go">
            Go
          </p>
          <p className="hero-text">Wild</p>
        </div>
        <NavLink className="hero-text-button" to="/api/spots">Explore nearby stays</NavLink>
      </div>
    </div>
  );
}

export default Banner;
