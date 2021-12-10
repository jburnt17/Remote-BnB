import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spotReducer";

function BookingCard({ id, spotId, userId, startDate, endDate }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  const spotObj = useSelector((state) => ({ ...state.spotState.entries }));
  const spots = Object.values(spotObj);
  const bookingObj = useSelector((state) => ({
    ...state.bookingState.entries,
  }));
  const bookings = Object.values(bookingObj);

  let start = new Date(startDate).toUTCString();
  start = start.split("").slice(0, 16);
  let end = new Date(endDate).toUTCString();
  end = end.split("").slice(0, 16);

  const userMatch = () => {
    return +userId === +sessionUser.id;
  };

  return (
    <div>
      <ul>
        {userMatch() && (
          <>
            <p>{id}</p>
            <h2>{start}</h2>
            <h2>{end}</h2>
          </>
        )}
        {userMatch() &&
          spots.map(({ id, city, state, country, price }) => (
            <div>
              {spotId === id ? (
                <>
                  <li>{id}</li>
                  <li>{city}</li>
                  <li>{state}</li>
                  <li>{country}</li>
                  <li>{price}</li>
                </>
              ) : null}
            </div>
          ))}
      </ul>
    </div>
  );
}

export default BookingCard;
