import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import LoginForm from "./auth/LoginForm/LoginForm";
import RegistrationForm from "./auth/RegistrationForm";

import bgImage from "../assets/landing.jpg";
const bgStyle = {
  backgroundImage: "url(" + bgImage + ")",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
};

const App = () => (
  <Fragment>
    <div style={bgStyle}>
      <Router>
        <Route path="/" component={Landing} exact></Route>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegistrationForm} />
      </Router>
    </div>
  </Fragment>
);

export default App;
