import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { demoLogin } from "../../store/session";
import { XIcon, ExclamationIcon } from "@heroicons/react/solid";
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
  const user = {credential: 'demo@user.io', password: 'password'}
  const demoUser = (e) => {
    e.preventDefault();
    dispatch(demoLogin(user));
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
                <div className="error-container">
                  <ExclamationIcon className="error-x"/>
                <p key={idx}>{error}</p>
                </div>
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
          </form>
            <p className="split-con">
              <span className="split">or</span>
            </p>
            <NavLink to="/signup" className="log-signup-button" type="submit">
              Sign Up
            </NavLink>
            <button onClick={demoUser} className="demo-button">
              Demo
            </button>
        </div>
      </div>
    </>
  );
}

export default LoginFormPage;
