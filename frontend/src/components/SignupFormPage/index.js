import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { XIcon, ExclamationIcon } from "@heroicons/react/solid";
import { UploadIcon } from "@heroicons/react/outline";
import * as sessionActions from "../../store/session";
import "./signup.css";
import { Avatar } from "@mui/material";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      console.log("image inside handleSubmit =>", image);
      return dispatch(
        sessionActions.signup({ email, username, password, image })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    console.log(file)
  };

  return (
    <>
      <NavLink to="/">
        <XIcon className="close-host-form" />
      </NavLink>
      <div className="signup-page-body">
        <div className="left-login">
          <h2 className="left-login-text">Welcome to Remotebnb</h2>
        </div>
        <div className="signup-form-container">
          <h2 className="signup-form-title">Sign Up</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            {errors.map((error, idx) => (
              <div className="error-container">
                <ExclamationIcon className="error-x" />
                <p key={idx}>{error}</p>
              </div>
            ))}
            <input
              placeholder="Email"
              className="signup-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              placeholder="Username"
              className="signup-user"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              placeholder="Password"
              className="signup-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              placeholder="Confirm Password"
              className="signup-con-pass"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label for="file-upload">
              <div className="avatar-upload-con">
                <div className="file-button-con">
                  <UploadIcon width={16} />
                  <p>Upload File...</p>
                </div>
                <Avatar src={image && URL.createObjectURL(image)}/>
              </div>
            </label>
            <input
              type="file"
              onChange={updateFile}
              id="file-upload"
              className="hide-upload-button"
            />

            <button className="signup-button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
