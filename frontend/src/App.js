import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Home from "./components/Home";
import * as sessionActions from "./store/session";
import HostForm from "./components/HostForm";
import SpotsList from "./components/SpotsList";
import EditSpot from "./components/EditSpot";
// import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/host">
          <HostForm />
        </Route>
        <Route path="/spots/:spotId/edit">
          <EditSpot />
        </Route>
        <Route path="/spots">
          <SpotsList />
        </Route>
      </Switch>
    </>
  );
}

export default App;
