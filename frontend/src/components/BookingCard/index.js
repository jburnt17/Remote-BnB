import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpots } from "../../store/spotReducer";
import "./BookingCard.css";

function BookingCard({ id, spotId, userId, startDate, endDate }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  useEffect(() => {
    const cardCon = document.querySelector(".booking-card-con");
    if (+userId !== +sessionUser.id) {
      console.log(cardCon)
      return cardCon.style.display = 'none';
    }
  }, [dispatch])

  const spotObj = useSelector((state) => ({ ...state.spotState.entries }));
  const spots = Object.values(spotObj);

  let start = new Date(startDate).toUTCString();
  start = start.split("").slice(0, 16);
  let end = new Date(endDate).toUTCString();
  end = end.split("").slice(0, 16);

  // const userMatch = () => {
  //   return +userId === +sessionUser.id;
  // };
  const userMatch = () => {
    if (+userId === +sessionUser.id) {
      return true;
    }
  };

  return (
    <div className="booking-card-con">
      {userMatch() && (
        <div>
          <img
            className="booking-image"
            src="https://a0.muscache.com/im/pictures/6d0d3c2b-8515-40fd-9039-c36ea1c067db.jpg?im_w=720"
          />
        </div>
      )}
      {userMatch() && (
        <div className="booking-date-con">
          <div>
            <p className="booking-date-title">Check in:</p>
            <p>{start}</p>
          </div>
          <div>
            <p className="booking-date-title">Check out:</p>
            <p>{end}</p>
          </div>
        </div>
      )}
      {userMatch() &&
        spots.map(({ id, city, state, country, price }) => (
          <>
            {spotId === id ? (
              <div className="booking-info">
                <p>{city},</p>
                <p>{state}</p>
                <p>${price}</p>
              </div>
            ) : null}
          </>
        ))}
    </div>
  );
}

export default BookingCard;
