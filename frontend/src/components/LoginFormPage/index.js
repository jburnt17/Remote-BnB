import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { XIcon } from "@heroicons/react/solid";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <NavLink to="/">
        <XIcon className="close-host-form" />
      </NavLink>
      <div className="login-page-body">
        <div className="left-login">
          <h2 className="left-login-text">Welcome to Remotebnb</h2>
        </div>
        <div className="login-form-container">
          <h2 className="login-form-title">Login or signup</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <input
              className="username-input"
              type="text"
              value={credential}
              placeholder="Username or Email"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
            <input
              className="password-input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="login-button" type="submit">
              Log In
            </button>
            <p className="split-con">
              <span className="split">or</span>
            </p>
            <button className="log-signup-button" type="submit">
              Sign Up
            </button>
            <button className="demo-button" type="submit">
              Demo
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
