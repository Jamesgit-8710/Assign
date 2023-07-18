import React from "react";
import { Button, Form, Input } from "antd";
import "../styles/login.css";
import { useDispatch } from "react-redux";
import { addUser, verify } from "../slices/user/user.slice";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

function Login() {

  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info('Please enter the 10 digits');
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (value) => {
    if (value.PhoneNumber.length === 10) {
      dispatch(addUser(value.PhoneNumber));
      dispatch(verify("otp"))
      // console.log(value.PhoneNumber)
      navigate("/", { replace: true });
    } else {
      info();
    }
  };

  const onFinishFailed = (errorInfo) => {


  };

  return (
    <div className="login">
      {contextHolder}
      <div className="form" style={{ textAlign: "center" }}>
        <h1 style={{ marginTop: 75, color: "rgba(0, 14, 62, 0.8)" }}>Login</h1>
        <Form
          name="basic"
          style={{ height: 270, margin: 50, display: "flex", flexDirection: "column" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ margin: 0, padding: 0 }}
            name="PhoneNumber"
            rules={[
              { required: true, message: "Please input your Phone number!" },
            ]}
          >
            <Input type="number" placeholder="Phone number" style={{ height: 50 }} maxLength={10}/>
          </Form.Item>

          <Form.Item >
            <Button type="primary" htmlType="submit" style={{ height: "43px", width: "100%", fontSize: 18, marginTop: 38, backgroundColor: "rgb(0, 14, 62, 0.8)" }}>
              Send OTP
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="pic">

      </div>
    </div>
  );
}

export default Login;
