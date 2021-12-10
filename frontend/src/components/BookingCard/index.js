import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSpot, getSpots } from "../../store/spotReducer";
import { deleteBooking } from "../../store/bookingReducer";
import "./BookingCard.css";

function BookingCard({ bookingId, spotId, userId, startDate, endDate }) {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const spotObj = useSelector((state) => ({ ...state.spotState.entries }));
  const spots = Object.values(spotObj);

  let start = new Date(startDate).toUTCString();
  start = start.split("").slice(0, 16);
  let end = new Date(endDate).toUTCString();
  end = end.split("").slice(0, 16);

  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  useEffect(() => {
    const cardCon = document.querySelector(".booking-card-con");
    if (+userId !== +sessionUser.id) {
      return (cardCon.style.display = "none");
    }
  }, [dispatch]);

  const userMatch = () => {
    if (+userId === +sessionUser.id) {
      return true;
    }
  };

  const [deleteShow, setDeleteShow] = useState(true);
  useEffect(async() => {
    await sessionUser;
    const deleteCon = document.querySelector(`#booking-option-${bookingId}`);
    console.log(deleteCon);
    if (deleteCon && !deleteShow) {
      deleteCon.style.display = "flex";
    } else if (deleteCon && deleteShow) {
      deleteCon.style.display = "none";
    }
  }, [deleteShow]);

  return (
    <div
      onClick={() => setDeleteShow(!deleteShow)}
      className="booking-card-con"
    >
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
          <div key={id}>
            {spotId === id ? (
              <div className="booking-info">
                <p>{city},</p>
                <p>{state}</p>
                <p>${price}</p>
                { sessionUser &&
                  <div
                    className={`booking-delete-container`}
                    id={`booking-option-${bookingId}`}
                  >
                    <button
                      onClick={() => dispatch(deleteBooking(bookingId))}
                      className="booking-delete-button"
                    >
                      Delete
                    </button>
                  </div>
                }
              </div>
            ) : null}
          </div>
        ))}
    </div>
  );
}

export default BookingCard;
