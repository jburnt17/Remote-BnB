import { useState, useEffect, React, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { createSpot } from "../../store/spotReducer";
import { XIcon, ExclamationIcon } from "@heroicons/react/solid";
import "./HostForm.css";

function HostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);


  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

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
      if (!price || price < 0) e.push("Please provide a valid price");
      setErrors(e);
    }
  }, [price])

  if (!sessionUser) return <Redirect to="/signup" />;

  const handleSubmit = async (e) => {
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
    if (!errors.length) {
      await dispatch(createSpot(spot));
      history.push("/spots");
    }
  };

  return (
    <>
      <NavLink to="/">
        <XIcon className="close-host-form" />
      </NavLink>
      <div className="host-page-body">
        <div className="left-host">
          {sessionUser && (
            <h2 className="left-host-text">{`Start hosting, ${sessionUser.username}`}</h2>
          )}
        </div>
        <div className="host-form-container">
          <h2 className="host-form-title">Finish your listing.</h2>
          <form className="host-form" onSubmit={handleSubmit}>
            {errors.map((error, i) => (
              <div className="error-container" key={i}>
                <ExclamationIcon className="error-x" />
                <p>{error}</p>
              </div>
            ))}
            <input
              type="text"
              onChange={updateAddress}
              value={address}
              placeholder="Address"
              name="address"
              required
            />
            <input
              type="text"
              onChange={updateCity}
              value={city}
              placeholder="City"
              name="city"
              required
            />
            <input
              type="text"
              onChange={updateState}
              value={state}
              placeholder="State"
              name="state"
              required
            />
            <input
              type="text"
              onChange={updateCountry}
              value={country}
              placeholder="Country"
              name="country"
              required
            />
            <input
              type="text"
              onChange={updateName}
              value={name}
              placeholder="Title"
              name="title"
              required
            />
            <input
              type="number"
              onChange={updatePrice}
              value={price}
              placeholder="Price"
              name="price"
              required
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
