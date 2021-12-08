import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import "./styles.css";

import { getSpots } from "../../store/spotReducer";
import SpotCard from "../SpotCard";

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
      <section className="spot-section">
        <div className="spot-container">
          {spots.map(({ id, name, city, state, price }, i) => (
            <SpotCard
              key={i}
              name={name}
              city={city}
              state={state}
              price={price}
              spotId={id}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default SpotsList;
