import React from "react";
import "./styles.css";
import { DotsCircleHorizontalIcon } from "@heroicons/react/solid";
import { NavLink } from "react-router-dom";

function SpotCard({ name, city, state, price }) {
  return (
    <div className="spot-card">
      <div className="image-dot-con">
        <img
          className="spot-image"
          src="https://a0.muscache.com/im/pictures/6d0d3c2b-8515-40fd-9039-c36ea1c067db.jpg?im_w=720"
        />
        <DotsCircleHorizontalIcon className="spot-dots" />
        <ol className="spot-options">
          <NavLink className="options-link" to="/api/spots/:id">
            Delete
          </NavLink>
          <NavLink className="options-link" to="/api/spots/:id">
            Edit
          </NavLink>
        </ol>
      </div>
      <div className="spot-desc">
        {name} | {city}, {state}
      </div>
      <div className="spot-price">${price} / night</div>
    </div>
  );
}

export default SpotCard;
