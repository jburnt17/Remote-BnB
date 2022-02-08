import React, { useEffect } from "react";
import "./UserBookings.css";
import { XIcon } from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getBookings } from "../../store/bookingReducer";
import BookingCard from "../BookingCard";

function UserBookings() {
  const sessionUser = useSelector((state) => state?.session.user);
  const bookings = Object.values(useSelector((state) => state?.bookingState));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  return (
    <>
      <NavLink to="/">
        <XIcon className="close-booking-form" />
      </NavLink>
      <div className="booking-page-body">
        <div className="left-booking">
          {sessionUser && (
            <h2 className="left-booking-text">{`Enjoy your stay, ${sessionUser.username}`}</h2>
          )}
        </div>
        <div className="booking-container">
          <h2 className="booking-title">Bookings</h2>
          {bookings.map(({ id, spotId, userId, startDate, endDate }, i) => (
            <BookingCard
              key={i}
              bookingId={id}
              spotId={spotId}
              userId={userId}
              startDate={startDate}
              endDate={endDate}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default UserBookings;
