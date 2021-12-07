import React from "react";
import "./styles.css";

function SmallCard({ img, location }) {
  return (
    <div className="card">
      <div className="card-img">
        <img className='card-img' src={img} alt={location} />
      </div>
      <div className="card-loc">{location}</div>
    </div>
  );
}

export default SmallCard;
