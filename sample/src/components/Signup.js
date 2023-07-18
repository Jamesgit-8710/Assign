import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import Data from "./Data";

const Signup = () => {
  const [data, setData] = useState([]);
  const [val, setVal] = useState(0)

  const onFinish = async (values) => {
    // const us = values.username;
    // const pass = values.password;
    const res = await axios.post("http://localhost:8000/api");
    // alert(res.data);
    // console.log(res.data.api.intervals)
    setData(res.data.api.intervals);

    setVal(1);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {
        val? 
        <Data data={data}/>
        :
        <div style={{ display: "flex", justifyContent: "center" }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
            backgroundColor: "rgba(0,0,0,0.050",
            padding: 50,
            borderRadius: "10px",
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
      }

      
    </>
  );
};

export default Signup;
