import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { deleteSpot } from "../../store/spotReducer";
import { DotsCircleHorizontalIcon } from "@heroicons/react/solid";
import "./styles.css";

function SpotCard({ spotId, name, city, state, price }) {
  const dispatch = useDispatch();
  const [optionsShow, setOptionsShow] = useState(true);

  useEffect(() => {
    const options = document.querySelector('.spot-options');
    if(!optionsShow) {
      options.style.display = 'flex';
    } else {
      options.style.display = 'none';
    }
  }, [optionsShow]);

  return (
    <div className="spot-card">
      <div className="image-dot-con">
        <img
          className="spot-image"
          src="https://a0.muscache.com/im/pictures/6d0d3c2b-8515-40fd-9039-c36ea1c067db.jpg?im_w=720"
        />
        <DotsCircleHorizontalIcon onClick={() => setOptionsShow(!optionsShow)} className="spot-dots" />
        <ol className="spot-options">
          <button className="options-link delete-button" onClick={() => dispatch(deleteSpot(spotId))}>Delete</button>
          <NavLink to={`/api/spots/${spotId}/edit`} className="options-link" >
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
