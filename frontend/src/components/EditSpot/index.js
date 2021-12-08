import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";

function EditSpot() {
  const { spotId } = useParams();
  const spots = useSelector((state) => state.spotState.entries);
  const { city, state, country, address, name, price } = spots[spotId];

  const [editCity, setEditCity] = useState(city);
  const [editState, setEditState] = useState(state);
  const [editCountry, setEditCountry] = useState(country);
  const [editAddress, setEditAddress] = useState(address);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);


  const updateCity = (e) => setEditCity(e.target.value);
  const updateState = (e) => setEditState(e.target.value);
  const updateCountry = (e) => setEditCountry(e.target.value);
  const updateAddress = (e) => setEditAddress(e.target.value);
  const updateName = (e) => setEditName(e.target.value);
  const updatePrice = (e) => setEditPrice(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  }
  
  return (
    <div>
      <NavBar />
      <div>Hello, {spotId}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={updateAddress}
          value={address}
          placeholder="Address"
          name="address"
        />
        <input
          type="text"
          onChange={updateCity}
          value={city}
          placeholder="City"
          name="city"
        />
        <input
          type="text"
          onChange={updateState}
          value={state}
          placeholder="State"
          name="state"
        />
        <input
          type="text"
          onChange={updateCountry}
          value={country}
          placeholder="Country"
          name="country"
        />
        <input
          type="text"
          onChange={updateName}
          value={name}
          placeholder="Title"
          name="title"
        />
        <input
          type="number"
          onChange={updatePrice}
          value={price}
          placeholder="Price"
          name="price"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditSpot;
