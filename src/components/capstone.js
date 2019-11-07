import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavBar from "./Navbar/NavBar";
import ApplicationViews from "./ApplicationViews";

const CapstoneBuilder = () => {
  return (
    <React.Fragment>
      <Route render={props => <NavBar {...props} />} />
      <ApplicationViews />
    </React.Fragment>
  );
};

export default CapstoneBuilder;
