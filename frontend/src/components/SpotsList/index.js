import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NavBar from "../NavBar";
import "./styles.css";

import { getSpots } from "../../store/spotReducer";
import SpotCard from "../SpotCard";
import { Redirect } from "react-router";
import { useTransition, animated, config } from "react-spring";

function SpotsList() {
  const sessionUser = useSelector((state) => state.session?.user);
  const dispatch = useDispatch();
  const spotObj = useSelector((state) => ({ ...state.spotState.entries }));
  const spots = Object.values(spotObj);
  const transitions = useTransition(null, {
    from: {
      opacity: 0,
      y: 1000
    },
    enter: {
      opacity: 1,
      y: 0,
    },
  });

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  useEffect(() => {
    (function () {
      document.documentElement.scrollTop = 0;
    })();
  }, []);

  return (
    <div>
      <NavBar />
      <section className="spot-section">
        <div className="spot-container">
          {spots.map(({ id, name, city, state, price, images }, i) => (
            <>
              {transitions((style) => (
                <animated.div style={style}>
                  <SpotCard
                    spotObj={spotObj}
                    spots={spots}
                    key={i}
                    ind={i}
                    name={name}
                    city={city}
                    state={state}
                    price={price}
                    spotId={id}
                    images={images}
                  />
                </animated.div>
              ))}
            </>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SpotsList;
