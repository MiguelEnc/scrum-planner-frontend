import React, { Fragment } from "react";
import bgImage from "../../assets/landing.jpeg";
import { Button, Row, Col } from "antd";

const bgStyle = {
  backgroundImage: "url(" + bgImage + ")",
};

const Landing = () => {
  return (
    <Fragment>
      <div className="bg-image" style={bgStyle}></div>
      <div className="bg-text">
        <Row justify="center">
          <h1>Scrum Helper</h1>
        </Row>
        <Row justify="center">
          <p>Retrospectives and planning poker for agile teams</p>
        </Row>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col xs={10} offset={2}>
            <Button type="primary" block>
              Log In
            </Button>
          </Col>
          <Col xs={10}>
            <Button block>Sign Up</Button>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Landing;
