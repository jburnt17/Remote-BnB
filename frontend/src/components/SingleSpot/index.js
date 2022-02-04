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

function SingleSpot() {
  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spotState);
  const { address, city, country, name, price, state, beds, baths, images } =
    spot;

  useEffect(() => {
    dispatch(getSpot(spotId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <>
      <NavBar />
      <div className="spot-page-body">
        <h1 className="spot-page-title">{name}</h1>
        <div className="single-spot-image-con">
          {images?.map((image, i) => (
            <img src={image} width={400} className={`spot-image-${i + 1}`} />
          ))}
        </div>
        <p>{address}</p>
        <p>{city}</p>
        <p>{state}</p>
        <p>{country}</p>
        <p>${price}</p>
        <p>{parseInt(beds)} beds</p>
        <p>{parseInt(baths)} baths</p>
        <div>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateState}
          />
        </div>
      </div>
    </>
  );
}

export default SingleSpot;
