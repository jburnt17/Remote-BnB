import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import NavBar from "../NavBar";

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
    <div>
      <NavBar />
      <div className="login-body-con">
        <div className="login-form-con">
          <div className="login-form-title-con">
            <h3 className="login-form-title">Login or sign up</h3>
          </div>
          <h2 className="login-welcome">Welcome to Remotebnb</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="input-wrapper">
              <label>
                <input
                  className="username-input"
                  type="text"
                  value={credential}
                  placeholder="Username or Email"
                  onChange={(e) => setCredential(e.target.value)}
                  required
                />
              </label>
              <label>
                <input
                  className="password-input"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
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
    </div>
  );
}

export default LoginFormPage;
