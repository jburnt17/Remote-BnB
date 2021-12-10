import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getSpot } from "../../store/spotReducer";
import { createBooking } from "../../store/bookingReducer";
import { XIcon } from "@heroicons/react/solid";
import NavBar from "../NavBar";
import "./SingleSpot.css";

function SingleSpot() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const singleState = useSelector((state) => state.spotState);
  const { address, city, country, name, price, state } = singleState;

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
      <NavLink to="/spots">
        <XIcon className="close-edit-form" />
      </NavLink>
      <div className="spot-page-body">
        <div className="single-spot-image-con">
          <img
            className="single-spot-image"
            src="https://a0.muscache.com/im/pictures/miso/Hosting-39300792/original/e3c41b3e-d43f-4fd4-a016-b6bc10a3c782.jpeg?im_w=1200"
          />
        </div>
        <div className="right-single-spot-con">
          <div>
            <p className="booking-form-title">
              {name} in {city}
            </p>
            <div className="booking-description">
              <p className="booking-page-address">
                {address}, {city},{state},{country}
              </p>
              <p className="spot-page-price">${price}/night</p>
            </div>
          </div>
          <form className="booking-form" onSubmit={handleSubmit}>
            <input type="date" value={startDate} onChange={updateStart} />
            <input type="date" value={endDate} onChange={updateEnd} />
            <button className="booking-spot-button" type="submit">
              Book now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SingleSpot;
