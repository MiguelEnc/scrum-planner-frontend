import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Item } = Form;

const LoginForm = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div id="login">
      <Row justify="center" id="login__row">
        <Col
          id="login__col"
          xs={{ span: 16 }}
          sm={{ span: 13 }}
          md={{ span: 10 }}
          lg={{ span: 8 }}
          xl={{ span: 6 }}
          xxl={{ span: 4 }}
        >
          <Form
            name="normal_login"
            className="login-form"
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
                Log in
              </Button>
            </Item>
            <Item noStyle>
              <p style={{ marginBottom: 0 }}>
                Or <a href="">register now!</a>
              </p>
            </Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
