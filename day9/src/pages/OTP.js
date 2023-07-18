import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { verify } from "../slices/user/otp.slice";
import { useNavigate } from "react-router";
import { addUser } from "../slices/user/otp.slice";
import { log } from "../slices/resume/resume.slice";
import OtpInput from 'react-otp-input';
import '../styles/otp.css'
import img from "../assets/otp.webp";
import { message } from 'antd';

function OTP() {

  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info('wrong OTP');
  };


  const state = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');

  const state3 = useSelector((state) => state.resumes);
  const state2 = useSelector((state) => state.otp);

  const onFinish = () => {
    const x = process.env.REACT_APP_OTP;

    if (otp === x) {
      dispatch(addUser(state.data));
      dispatch(verify());

      const a = state.data;

      const x = state3.filter((e) => {
        return a === e.id;
      });

      if (x.length === 0) {
        // console.log(x);
        const temp = {
          id: a,
          data: [],
        };
        dispatch(log(temp));
      }

      navigate("/", { replace: true });
    } else {
      info();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login">
      {contextHolder}
      <div className="pic" style={{ borderRadius: "15px 0px 0px 15px", backgroundImage: `url(${img})` }}>

      </div>
      <div className="form" style={{ textAlign: "center", borderRadius: "0px 15px 15px 0px" }}>
        <h2 style={{ marginTop: 75, color: "rgba(0, 14, 62, 0.8)" }}>Authentication Code</h2>
        <Form style={{ margin: 60, marginTop: 80 }}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item style={{ marginLeft: "35px" }}
            name="OTP"
            rules={[{ required: true, message: "Please enter the OTP" }]}
          >
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span style={{ color: "rgba(0, 14, 62, 0)" }}>{"msp"}</span>}
              renderInput={(props) => <input {...props} className="otp" />}
            />
          </Form.Item>



          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ height: "43px", width: "100%", fontSize: 18, marginTop: 38, backgroundColor: "rgb(0, 14, 62, 0.8)" }}>
              verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default OTP;
