import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editSpot } from "../../store/spotReducer";
import NavBar from "../NavBar";
import './EditSpot.css'

function EditSpot() {
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
  const dispatch = useDispatch();

  const updateCity = (e) => setEditCity(e.target.value);
  const updateState = (e) => setEditState(e.target.value);
  const updateCountry = (e) => setEditCountry(e.target.value);
  const updateAddress = (e) => setEditAddress(e.target.value);
  const updateName = (e) => setEditName(e.target.value);
  const updatePrice = (e) => setEditPrice(e.target.value);

  const handleSubmit = (e) => {
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
    dispatch(editSpot(spot, spotId));
  };

  return (
    <div>
      <NavBar />
      <div>Hello, {spotId}</div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditSpot;
