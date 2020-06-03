import React from "react";
import { Row, Col } from "antd";
import Jumbotron from "../Layout/Jumbotron/Jumbotron";
import LoginForm from "../auth/LoginForm/LoginForm";

import bgImage from "../../assets/landing.jpg";
const bgStyle = {
  backgroundImage: "url(" + bgImage + ")",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
};

const Landing = () => {
  return (
    <div id="bg" style={bgStyle}>
      <Row id="landing__row">
        <Col xs={24} lg={12} xxl={{ span: 10, offset: 2 }}>
          <Jumbotron />
        </Col>
        <Col xs={24} lg={12}>
          <LoginForm />
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
