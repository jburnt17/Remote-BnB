import React from "react";
import "./styles.css";

function Banner() {
  return (
    <div className="banner-con">
      <div className="hero-text-con">
        <div>
          <p className="hero-text" id="go">
            Go
          </p>
          <p className="hero-text">Wild</p>
        </div>
        <button className="hero-text-button">Explore nearby stays</button>
      </div>
    </div>
  );
}

export default Banner;
