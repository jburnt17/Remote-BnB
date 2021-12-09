import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpot } from "../../store/spotReducer";
import { createBooking } from "../../store/bookingReducer";
import NavBar from "../NavBar";

function SingleSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const singleState = useSelector((state) => state.spotState);
  const { address, city, country, name, price, state } = singleState;
  console.log(sessionUser.id);

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const updateStart = (e) => setStartDate(e.target.value);
  const updateEnd = (e) => setEndDate(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const booking = {
      userId: sessionUser.id,
      spotId,
      startDate,
      endDate,
    };
    dispatch(createBooking(booking));
  };
  return (
    <>
      <NavBar />
      <h2>Hello {spotId}</h2>
      <h2>{address}</h2>
      <h2>{city}</h2>
      <h2>{country}</h2>
      <h2>{name}</h2>
      <h2>{price}</h2>
      <h2>{state}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          start
          <input type="date" value={startDate} onChange={updateStart} />
        </label>
        <label>
          end
          <input type="date" value={endDate} onChange={updateEnd} />
        </label>
        <button type="submit">Book now</button>
      </form>
    </>
  );
}

export default SingleSpot;
