import { useState, useEffect, React } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./styles.css";

function HostForm() {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setCity(e.target.value);
  const updateCountry = (e) => setCity(e.target.value);
  const updateTitle = (e) => setCity(e.target.value);
  const updatePrice = (e) => setCity(e.target.value);

  return (
    <div></div>
  );
}

export default HostForm;
