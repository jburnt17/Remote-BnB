import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import "./styles.css";

import { getSpots } from "../../store/spotReducer";
import SpotCard from "../SpotCard";
//TODO CREATE SINGLE SPOT COMPONENT AND IMPORT!!!

function SpotsList() {
  const dispatch = useDispatch();
  const spotObj = useSelector((state) => state.spotState.entries);
  const spots = Object.values(spotObj);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <section>
        <div className="spot-container">
          {spots.map(({ name, city, state, price }, i) => (
            <SpotCard
              key={i}
              name={name}
              city={city}
              state={state}
              price={price}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SpotsList;
