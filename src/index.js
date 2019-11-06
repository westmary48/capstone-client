import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CapstoneBuilder from "./components/capstone";
import "./index.css";

ReactDOM.render(
  <Router>
    <CapstoneBuilder />
  </Router>,

  document.getElementById("root")
);
