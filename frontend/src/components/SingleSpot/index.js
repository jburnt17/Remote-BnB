import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getSpot } from "../../store/spotReducer";
import { add, eachDayOfInterval, format } from "date-fns";
import { useMediaQuery } from "@mui/material";
import { DateRange } from "react-date-range";
import NavBar from "../NavBar";
import "./SingleSpot.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { fetchUsers } from "../../store/users";
import { createComment, getComments } from "../../store/comments";
import { restoreUser } from "../../store/session";
import { Avatar } from "@mui/material";
import { createBooking, getBookings } from "../../store/bookingReducer";
import { Carousel } from "react-responsive-carousel";

function SingleSpot() {
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [comment, setComment] = useState("");

  const { spotId } = useParams();
  const dispatch = useDispatch();

  const usersObj = useSelector((state) => state.users);
  const currentUserId = useSelector((state) => state.session.user?.id);
  const commentsObj = useSelector((state) => state.comments);
  const bookedDatesObj = useSelector((state) => state.bookingState);

  const comments = Object.values(commentsObj);
  const users = Object.values(usersObj);
  const matches = useMediaQuery("(max-width:1225px)");

  const bookedDates = Object.values(bookedDatesObj).filter(
    (booking) => +booking.spotId === +spotId
  );

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
    return setComment("");
  };

  const handleBookingSubmit = (spotId, startDate, endDate) => {
    dispatch(createBooking(startDate, endDate, spotId, currentUserId));
  };

  const handleDisabledDates = () => {
    const disabledDates = [];
    bookedDates.map((bookedDate) => {
      eachDayOfInterval({
        start: new Date(bookedDate.startDate),
        end: new Date(bookedDate.endDate),
      }).map((day) => {
        disabledDates.push(day);
      });
    });
    return disabledDates;
  };

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(restoreUser());
    dispatch(fetchUsers());
    dispatch(getBookings());
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
        {matches ? (
          <Carousel
            showThumbs={false}
            showStatus={false}
            className="single-spot-cara"
          >
            {images?.map((image) => (
              <div>
                <img src={image} className="single-spot-cara" />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="single-spot-image-con">
            {images?.map((image, i) => (
              <img src={image} width={400} className={`spot-image-${i + 1}`} />
            ))}
          </div>
        )}
        <section className="spot-page-bottom">
          <div className="spot-page-info">
            <header className="host-info">
              <div className="spot-header-info">
                <p className="spot-page-hosted">
                  <span className="single-spot-city">{city}</span> home hosted
                  by {users.filter((user) => +user.id === +userId)[0]?.username}
                </p>
                <p className="spot-page-bed-bath">
                  {parseInt(beds)} bedrooms • {parseInt(baths)} baths
                </p>
              </div>
              <div className="spot-host-ava">
                <Avatar
                  srcSet={users.find((user) => user.id === userId)?.image}
                  sx={{ width: 58, height: 58 }}
                />
              </div>
            </header>
            <div className="spot-page-comment-con">
              <h3>{comments.length} comments</h3>
              {comments.slice(0, 8).map((comment) => (
                <div className="spot-page-ind-comment">
                  <div>
                    <div>
                      <Avatar
                        srcSet={
                          users.find((user) => user.id === comment.userId)
                            ?.image
                        }
                      />
                      <div className="comment-info">
                        <span className="comment-username">
                          {
                            users.filter(
                              (user) => +user.id === +comment.userId
                            )[0]?.username
                          }
                        </span>
                        <p className="date-posted">
                          {
                            new Date(comment.createdAt)
                              .toLocaleString()
                              .split(",")[0]
                          }
                        </p>
                      </div>
                    </div>
                    <div className="comment">{comment.content}</div>
                  </div>
                </div>
              ))}
              <form
                onSubmit={(e) => handleCommentSubmit(e, comment, spotId)}
                className="comment-form"
              >
                <input
                  placeholder="Leave a comment..."
                  onChange={(e) => setComment(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="booking-widget">
            <div className="booking-widget-header">
              <p className="per-night">
                <span className="booking-widget-price">${price} </span>/ night
              </p>
              <p className="widget-header-comments">
                {comments.length} comments
              </p>
            </div>

            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDateState([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateState}
              rangeColors={["rgb(47, 163, 115)"]}
              className="date-picker"
              minDate={new Date()}
              disabledDates={handleDisabledDates()}
            />
            <button
              className="book-now-button"
              onClick={() =>
                handleBookingSubmit(
                  spotId,
                  dateState[0].startDate,
                  dateState[0]?.endDate
                )
              }
            >
              Book now
            </button>
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
          <div className="map-section">
            <h1>Where you'll be</h1>
            <iframe
              className="map"
              frameBorder={0}
              src={`https://www.google.com/maps?key=AIzaSyDc-lbn7DevdVmlEH59jK-kWfWgoYpWhHwq=&q=${city}&output=embed`}
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
}

export default SingleSpot;
