import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import LoginForm from "./auth/LoginForm/LoginForm";
import RegistrationForm from "./auth/RegistrationForm/RegistrationForm";
import PageLayout from "./Layout/PageLayout";

const App = () => (
  <Fragment>
    <Router>
      <Route path="/" exact component={PageLayout} />
      <Route path="/register" component={RegistrationForm} />
      <Route path="/dashboard" component={PageLayout} />
    </Router>
  </Fragment>
);

export default App;
