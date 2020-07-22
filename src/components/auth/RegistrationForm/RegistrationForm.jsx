import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
const { Item } = Form;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 8,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const onFinish = (formData) => {
    console.log("Received values of form: ", formData);
  };

  return (
    <div id="registration">
      <Form
        {...formItemLayout}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please fill out your Name",
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please fill out your E-mail!",
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please fill out your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Item>

        <Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Item>

        <Item {...tailFormItemLayout} style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
