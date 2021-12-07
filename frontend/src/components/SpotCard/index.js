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
    const option = document.querySelector(`#option-${spotId}`);
    option.style.zIndex = "99";
    if (!optionsShow) {
      option.style.display = "flex";
    } else {
      option.style.display = "none";
    }
  }, [optionsShow]);

  const upper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="spot-card">
      <div className="image-dot-con">
        <img
          className="spot-image"
          src="https://a0.muscache.com/im/pictures/6d0d3c2b-8515-40fd-9039-c36ea1c067db.jpg?im_w=720"
        />
        <DotsCircleHorizontalIcon
          onClick={() => setOptionsShow(!optionsShow)}
          className="spot-dots"
        />
        <ol id={`option-${spotId}`} className="spot-options">
          <button
            className="options-link delete-button"
            onClick={() => {
              setOptionsShow(false)
              dispatch(deleteSpot(spotId));
            }}
          >
            Delete
          </button>
          <NavLink to={`/api/spots/${spotId}/edit`} className="options-link">
            Edit
          </NavLink>
        </ol>
      </div>
      <div className="spot-desc">
        {upper(city)}, {upper(state)}
      </div>
      <div className="spot-price">${price} / night</div>
    </div>
  );
}

export default SpotCard;
