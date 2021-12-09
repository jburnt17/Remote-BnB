import { useState, useEffect, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createSpot } from "../../store/spotReducer";
import logo from "../../images/remote-logo.svg";
import { XIcon } from "@heroicons/react/solid";
import "./HostForm.css";

function HostForm() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const spot = {
      userId: sessionUser.id,
      address,
      city,
      state,
      country,
      name,
      price: Number(price),
    };
    dispatch(createSpot(spot));
  };

  console.log(sessionUser);

  return (
    <>
      <NavLink to="/"><XIcon className="close-host-form"/></NavLink>
      <div className="host-page-body">
        <div className="left-host">
          <h2 className="left-host-text">{`Start hosting, ${sessionUser.username}`}</h2>
        </div>
        <div className="host-form-container">
          <h2 className="host-form-title">Finish your listing.</h2>
          <form className="host-form" onSubmit={handleSubmit}>
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
            <button className="host-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default HostForm;
