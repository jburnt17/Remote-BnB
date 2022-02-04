import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSpot } from "../../store/spotReducer";
import { createBooking } from "../../store/bookingReducer";
import { DateRange } from "react-date-range";
import NavBar from "../NavBar";
import "./SingleSpot.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { fetchUsers } from "../../store/users";
import { createComment, getComments } from "../../store/comments";
import { restoreUser } from "../../store/session";

function SingleSpot() {
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [comment, setComment] = useState("");
  useEffect(
    () =>
      console.log(
        "start =>",
        dateState[0].startDate.getDate(),
        "end =>",
        dateState[0]?.endDate?.getDate()
      ),
    [dateState]
  );

  const { spotId } = useParams();
  const dispatch = useDispatch();

  const usersObj = useSelector((state) => state.users);
  const currentUserId = useSelector((state) => state.session.user?.id);
  const commentsObj = useSelector((state) => state.comments);

  const comments = Object.values(commentsObj);
  const users = Object.values(usersObj);
  const spot = useSelector((state) => state.spotState);
  const {
    address,
    city,
    country,
    name,
    price,
    state,
    beds,
    baths,
    images,
    userId,
  } = spot;

  const handleCommentSubmit = (e, comment, spot) => {
    e.preventDefault();
    dispatch(createComment(comment, spot, currentUserId));
  };

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(restoreUser());
    dispatch(fetchUsers());
    dispatch(getComments(spotId));
  }, []);

  return (
    <>
      <NavBar />
      <div className="spot-page-body">
        <div className="spot-page-title">
          <h1 className="spot-page-h1">{name}</h1>
          <p>
            {city}, {state}, {country}
          </p>
        </div>
        <div className="single-spot-image-con">
          {images?.map((image, i) => (
            <img src={image} width={400} className={`spot-image-${i + 1}`} />
          ))}
        </div>
        <p>
          {city} home hosted by{" "}
          {users.filter((user) => +user.id === +userId)[0]?.username}
        </p>
        <p>
          {parseInt(beds)} bedrooms • {parseInt(baths)} baths
        </p>
        <div className="booking-widget">

          <div className="booking-widget-header">
            <p className="per-night"><span className="booking-widget-price">${price} </span>/ night</p>
            <p className="widget-header-comments">{comments.length} comments</p>
          </div>

          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateState}
            rangeColors={["rgb(47, 163, 115)"]}
            className="date-picker"
          />
          <button className="book-now-button">Book now</button>
          <div className="pricing-container">
            <div className="price-per-night-con pricing-child-div">
              <p>
                ${price} x{" "}
                {dateState[0]?.endDate?.getDate() -
                  dateState[0]?.startDate?.getDate()}{" "}
                nights
              </p>
              <p>
                $
                {(dateState[0]?.endDate?.getDate() -
                  dateState[0]?.startDate?.getDate()) *
                  price}
              </p>
            </div>
            <div className="cleaning-fee-con pricing-child-div">
              <p>Cleaning Fee</p>
              <p>$150</p>
            </div>
            <div className="service-fee-con pricing-child-div">
              <p>Service Fee</p>
              <p>$300</p>
            </div>
            <div className="booking-total-con pricing-child-div">
              <p>Total before taxes</p>
              <p>
                $
                {(dateState[0]?.endDate?.getDate() -
                  dateState[0]?.startDate?.getDate()) *
                  price +
                  150 +
                  300}
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => handleCommentSubmit(e, comment, spotId)}>
          <input
            placeholder="comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <button>Submit</button>
        </form>
        {comments.map((comment) => (
          <>
            <div>
              {
                users.filter((user) => +user.id === +comment.userId)[0]
                  ?.username
              }
            </div>
            <div>{comment.content}</div>
          </>
        ))}
      </div>
    </>
  );
}

export default SingleSpot;
