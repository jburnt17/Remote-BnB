import React, { useState, useRef, useEffect } from "react";
import { useParams, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editSpot } from "../../store/spotReducer";
import { XIcon, ExclamationIcon } from "@heroicons/react/solid";
import "./EditSpot.css";

function EditSpot() {
  const history = useHistory();
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spotState.entries);
  const sessionUser = useSelector((state) => state.session.user);
  const { city, state, country, address, name, price } = spots[spotId];

  const [editCity, setEditCity] = useState(city);
  const [editState, setEditState] = useState(state);
  const [editCountry, setEditCountry] = useState(country);
  const [editAddress, setEditAddress] = useState(address);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const updateCity = (e) => setEditCity(e.target.value);
  const updateState = (e) => setEditState(e.target.value);
  const updateCountry = (e) => setEditCountry(e.target.value);
  const updateAddress = (e) => setEditAddress(e.target.value);
  const updateName = (e) => setEditName(e.target.value);
  const updatePrice = (e) => setEditPrice(e.target.value);

  const useComponentDidMount = () => {
    const ref = useRef();
    useEffect(() => {
      ref.current = true;
    }, []);
    return ref.current;
  };

  const isMounted = useComponentDidMount();

  useEffect(() => {
    if (isMounted) {
      const e = [];
      if (!editPrice || editPrice < 0) e.push("Please provide a valid price");
      setErrors(e);
    }
  }, [editPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const spot = {
      userId: sessionUser.id,
      address: editAddress,
      city: editCity,
      state: editState,
      country: editCountry,
      name: editName,
      price: Number(editPrice),
    };
    if (!errors.length) {
      await dispatch(editSpot(spot, spotId));
      history.push("/spots");
    }
  };

  return (
    <div>
      <NavLink to="/spots">
        <XIcon className="close-edit-form" />
      </NavLink>
      <div className="edit-page-body">
        <div className="left-edit">
          <h2 className="left-edit-text">{`Make a mistake ${sessionUser.username}?`}</h2>
        </div>
        <div className="edit-form-container">
          <h2 className="edit-form-title">Edit your listing.</h2>
          <form className="edit-form" onSubmit={handleSubmit}>
            {errors.map((error, i) => (
              <div className="error-container" key={i}>
                <ExclamationIcon className="error-x" />
                <p>{error}</p>
              </div>
            ))}
            <input
              type="text"
              onChange={updateAddress}
              value={editAddress}
              placeholder="Address"
              name="address"
            />
            <input
              type="text"
              onChange={updateCity}
              value={editCity}
              placeholder="City"
              name="city"
            />
            <input
              type="text"
              onChange={updateState}
              value={editState}
              placeholder="State"
              name="state"
            />
            <input
              type="text"
              onChange={updateCountry}
              value={editCountry}
              placeholder="Country"
              name="country"
            />
            <input
              type="text"
              onChange={updateName}
              value={editName}
              placeholder="Title"
              name="title"
            />
            <input
              type="number"
              onChange={updatePrice}
              value={editPrice}
              placeholder="Price"
              name="price"
            />
            <button className="edit-spot-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSpot;
