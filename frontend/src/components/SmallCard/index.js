import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

function SmallCard({ img, location }) {
  const history = useHistory();
  return (
    <div className="card" onClick={() => history.push(`/spots?location=${location}`)}>
      <div className="card-img">
        <img className='card-img' src={img} alt={location} />
      </div>
      <div className="card-loc">{location}</div>
    </div>
  );
}

export default SmallCard;
