import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Predict from "./components/prediction/Predict";
import Results from "./components/prediction/Results";
import Home from "./components/Home";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";

const Routing = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route element={<Home />} path={"/"} />
          <Route element={<Predict />} path={"/predict"} />
          <Route element={<Results />} path={"/results"} />
          <Route element={<Register />} path={"/register"} />
          <Route element={<Login />} path={"/login"} />
        </Switch>
      </Router>
    </div>
  );
};

export default Routing;
