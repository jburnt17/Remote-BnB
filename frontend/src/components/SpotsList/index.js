import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar";
import "./styles.css";

import { getSpots } from "../../store/spotReducer";
import { getSpot } from "../../store/spotReducer";
import SpotCard from "../SpotCard";

function SpotsList() {
  const dispatch = useDispatch();
  const spotObj = useSelector((state) => ({ ...state.spotState.entries }));
  const spots = Object.values(spotObj);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <section className="spot-section">
        <div className="spot-container">
          {spots.map(({ id, name, city, state, price }, i) => (
            <NavLink to={`/api/spots/${id}`}>
              <SpotCard
                spotObj={spotObj}
                spots={spots}
                key={i}
                name={name}
                city={city}
                state={state}
                price={price}
                spotId={id}
              />
            </NavLink>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SpotsList;
