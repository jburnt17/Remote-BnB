import React, { useEffect } from "react";
import "./UserBookings.css";
import { XIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBookings } from "../../store/bookingReducer";

function UserBookings() {
  const sessionUser = useSelector((state) => state.session.user);
  const bookingObj = useSelector((state) => ({
    ...state.bookingState.entries,
  }));
  const bookings = Object.values(bookingObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings(bookings));
  }, [dispatch]);

  return (
    <>
      <NavLink to="/">
        <XIcon className="close-booking-form" />
      </NavLink>
      <div className="booking-page-body">
        <div className="left-booking">
          {sessionUser && (
            <h2 className="left-booking-text">{`See you soon, ${sessionUser.username}`}</h2>
          )}
        </div>
        <div className="booking-container">
          <h2 className="booking-title">Bookings</h2>
          {/* TODO RENDER BOOKING COMPONENT */}
        </div>
      </div>
    </>
  );
}

export default UserBookings;
