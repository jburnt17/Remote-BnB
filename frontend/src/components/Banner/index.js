import React from "react";
import heroImg from "../../images/hero-image.jpg";
import "./styles.css";

function Banner() {
  return (
    <div className="banner-con">
      <div className="banner-text-con">
        <p className="banner-text">Not sure where to go?</p>
        <button className="banner-button">I'm flexible</button>
      </div>
    </div>
  );
}

export default Banner;
