import React from "react";
import "./styles.css";

function SpotCard({ name, city, state, price }) {
  return (
    <div className="spot-card">
      <img
        className="spot-image"
        src="https://a0.muscache.com/im/pictures/6d0d3c2b-8515-40fd-9039-c36ea1c067db.jpg?im_w=720"
      />
      <div className="spot-desc">
        {name} | {city}, {state}
      </div>
      <div className="spot-price">${price} / night</div>
    </div>
  );
}

export default SpotCard;
