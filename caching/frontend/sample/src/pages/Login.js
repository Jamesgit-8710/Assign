import React from "react";
import { Button, Form, Input } from "antd";
import "../styles/login.css";
import axios from "axios";

const Login = () => {
  const onFinish = async(values) => {
    console.log("Success:", values);
    await axios.get("http://localhost:8000/createSession");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="background">
      <Form
        name="basic"
        style={{
          width: 350,
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10
          //   border: "1px solid black"
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <h1 style={{margin: 0,padding: 0,textAlign: "center",marginBottom: 20}}>Login</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input placeholder="username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
