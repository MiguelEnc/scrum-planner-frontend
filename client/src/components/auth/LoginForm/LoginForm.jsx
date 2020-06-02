import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Item } = Form;

const LoginForm = () => {
  const onFinish = (formData) => {
    console.log("Received values of form: ", formData);
  };

  return (
    <Row justify="end" id="login__row">
      <Col id="login__col">
        <Form
          name="normal_login"
          className="login-form"
          style={{ width: "270px" }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please fill out your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Item>
          <Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please fill out your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Item>
          <Item>
            <Row>
              <Col xs={12}>
                <Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Item>
              </Col>
              <Col xs={12} id="login__forgot-wrapper">
                <a className="login-form-forgot" href="#">
                  Forgot password
                </a>
              </Col>
            </Row>
          </Item>

          <Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              <Link to="/dashboard">Log in</Link>
            </Button>
          </Item>
          <Item noStyle>
            <p style={{ marginBottom: 0 }}>
              Or <Link to="/register">register now!</Link>
            </p>
          </Item>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginForm;
