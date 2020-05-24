import React from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "antd";

const Landing = () => {
  return (
    <div id="landing">
      <Row justify="center" id="landing__vertical">
        <Col id="landing__col">
          <Row justify="center">
            <h1 id="landing__col__title">Scrum Planner</h1>
          </Row>
          <Row justify="center">
            <p>Retrospectives and planning poker</p>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col xs={10} offset={2}>
              <Button type="primary" block>
                <Link to="/login">Log In</Link>
              </Button>
            </Col>
            <Col xs={10}>
              <Button block>
                <Link to="/register">Sign Up</Link>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
