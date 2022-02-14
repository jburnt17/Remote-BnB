import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteSpot } from "../../store/spotReducer";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { Carousel } from "react-responsive-carousel";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "./styles.css";
import { useTransition, animated } from "react-spring";

function SpotCard({ ind, spotId, city, state, price, spotObj, images }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [optionsShow, setOptionsShow] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);

  const upper = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const optionCheck = () => {
    return +sessionUser.id === +spotObj[spotId].userId;
  };

  const transitions = useTransition(null, {
    from: {
      opacity: 0,
      y: -500,
    },
    enter: {
      opacity: 1,
      y: 0,
    },
  });

  return (
    <>
      <div className="spot-card">
        <div className="image-dot-con">
          {/* <img className="spot-image" src={images[0]} /> */}
          <Carousel showThumbs={false} showStatus={false}>
            {images.map((image) => (
              <div
                onClick={() => {
                  history.push(`/spots/${spotId}`);
                }}
              >
                <img src={image} className="spot-image" />
              </div>
            ))}
          </Carousel>
          {sessionUser && optionCheck() && (
            <DotsHorizontalIcon
              onClick={() => setOptionsShow(!optionsShow)}
              className="spot-dots"
            />
          )}
          {optionsShow && (
            <div className="spot-options-con">
              <ol id={`option-${spotId}`} className="spot-options">
                <button
                  style={{ color: "red" }}
                  className="options-link"
                  onClick={() => {
                    setOptionsShow(!optionsShow);
                    dispatch(deleteSpot(spotId));
                  }}
                >
                  Delete
                </button>
                <NavLink to={`/spots/${spotId}/edit`} className="options-link">
                  Edit
                </NavLink>
                <button
                  className="options-link"
                  onClick={() => setOptionsShow(!optionsShow)}
                >
                  Close
                </button>
              </ol>
            </div>
          )}
        </div>
        <div className="spot-desc">
          {upper(city)}, {upper(state)}
        </div>
        <div className="spot-price">${price} / night</div>
      </div>
    </>
  );
}

export default SpotCard;
