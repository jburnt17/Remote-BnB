import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";

import { getSpots } from "../../store/spotReducer";
//TODO CREATE SINGLE SPOT COMPONENT AND IMPORT!!!

function SpotsList() {
  const dispatch = useDispatch();
  const spotObj = useSelector((state) => state.spotState.entries);
  const spots = Object.values(spotObj);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      {spots.map(({ address, city, state, price }, i) => (
        <p key={i}>
          {price},{city},{state},{address}
        </p>
      ))}
    </>
  );
}

export default SpotsList;
