import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spotReducer";
import NavBar from "../NavBar";

function SingleSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <h2>Hello {spotId}</h2>
    </>
  );
}

export default SingleSpot;
