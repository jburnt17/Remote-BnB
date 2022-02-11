import { useState, useEffect, React, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { createSpot } from "../../store/spotReducer";
import { XIcon, ExclamationIcon } from "@heroicons/react/solid";
import { CameraIcon } from "@heroicons/react/outline";
import "./HostForm.css";
import { useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";

function HostForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const matches = useMediaQuery("(max-width:1225px)");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [beds, setBeds] = useState();
  const [baths, setBaths] = useState();
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState([]);
  const [step, setStep] = useState(0);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateBeds = (e) => setBeds(e.target.value);
  const updateBaths = (e) => setBaths(e.target.value);

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
  }, [price]);


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
      beds,
      baths,
      images,
    };
    if (!errors.length) {
      await dispatch(createSpot(spot));
      history.push("/spots");
    }
  };
  const updateFiles = (e) => {
    const files = e.target.files;
    setImages(files);
  };
  useEffect(() => {
    console.log(images);
  }, [images]);

  if (!sessionUser) return <Redirect to="/signup" />;
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
          <p className="step-of-count">STEP: {step + 1} OF 3</p>
          {step === 0 && (
            <h2 className="host-form-title">Address Information</h2>
          )}
          {step === 1 && (
            <h2 className="host-form-title">Listing Information</h2>
          )}
          {step === 2 && <h2 className="host-form-title">Add Photos</h2>}
          <form className="host-form" onSubmit={handleSubmit}>
            {/* {errors.map((error, i) => (
              <div className="error-container" key={i}>
                <ExclamationIcon className="error-x" />
                <p>{error}</p>
              </div>
            ))} */}
            {/* TODO ADD BETTER ERROR HANDLING1!@@!@!@!@!@!!@! */}
            {step === 0 && (
              <div className="step-container">
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
                <button className="host-button" onClick={() => setStep(1)}>
                  Next
                </button>
              </div>
            )}
            {step === 1 && (
              <div className="step-container">
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
                <input
                  type="number"
                  onChange={updateBeds}
                  value={beds}
                  placeholder="Beds"
                  name="beds"
                  required
                />
                <input
                  type="number"
                  onChange={updateBaths}
                  value={baths}
                  placeholder="Baths"
                  name="baths"
                  required
                />
                <div>
                  <button className="prev-button" onClick={() => setStep(0)}>
                    Previous
                  </button>
                  <button className="host-button" onClick={() => setStep(2)}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="step-container">
                <div className="host-image-container">
                  <Carousel
                    className="single-spot-cara"
                    showThumbs={false}
                    showStatus={false}
                  >
                    {images.length > 0 ? (
                      Object.values(images).map((image, i) => (
                        <img
                          src={image && URL.createObjectURL(image)}
                          height={150}
                          width={150}
                          className="cara-host-image"
                        />
                      ))
                    ) : (
                      <img className="cara-host-image" src="https://jmb-s3-bucket.s3.amazonaws.com/no-image.png"/>
                    )}
                  </Carousel>
                </div>
                <label>
                  <input type="file" multiple onChange={updateFiles} className="hide-file-input-host" id="file-upload"/>
                </label>
                <label for="file-upload" className="file-upload-label">
                    <div className="host-file-button-con">
                      <CameraIcon width={24} />
                      <p>Browse Photos...</p>
                  </div>
                </label>
                <div>
                  <button className="prev-button" onClick={() => setStep(1)}>
                    Previous
                  </button>
                  <button className="host-button" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default HostForm;
