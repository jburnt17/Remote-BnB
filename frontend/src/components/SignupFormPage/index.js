import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import NavBar from "../NavBar";
import * as sessionActions from "../../store/session";
import "./signup.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({ email, username, password })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
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
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
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
