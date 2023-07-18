import React, { useEffect, useState } from "react";
import "../styles/login.css";
import { Button, Form, Input } from "antd";
import { auth, db, provider } from "../services/user.auth";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import google from "../assets/google.png";
import {
  collection,
  addDoc,
  Firestore,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { async } from "@firebase/util";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { addUser } from "../slices/user.slice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info("Try again!");
  };

  const onFinish = (value) => {};

  const onFinishFailed = (errorInfo) => {};

  const signIn = async () => {
    await signInWithPopup(auth, provider)
      .then(async (result) => {
        //   const credential = GoogleAuthProvider.credentialFromResult(result);
        //   const token = credential.accessToken;

        const user = result.user;
        dispatch(addUser(user.uid));

        const q = query(collection(db, "users"), where("id", "==", user.uid));

        const querySnapshot = await getDocs(q);

        try {
          if (querySnapshot.empty) {
            await addDoc(collection(db, "users"), {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              status: true,
              typing: false,
              typingFor: ""
            });
          }else{
            
            let i = "";
            querySnapshot.forEach((doc) => {
              i=doc.id;
            });

            const Ref = doc(db, "users", i);

            await updateDoc(Ref, {
              status: true
            });

          }
        } catch (err) {
          alert(err);
        }

        // navigate('/main',{ state: user.displayName})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="backGround">
      {contextHolder}
      <div className="innerDiv">
        <p>Sign in </p>
        <Form
          name="basic"
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
            <Input
              id="username"
              type="text"
              placeholder="username"
              style={{ height: 40, marginTop: 45 }}
            />
          </Form.Item>
          <Form.Item
            style={{ margin: 0, padding: 0 }}
            name="PhoneNumber"
            rules={[
              { required: true, message: "Please input your Phone number!" },
            ]}
          >
            <Input.Password
              id="password"
              type="text"
              placeholder="password"
              style={{ height: 40, marginTop: 20 }}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                height: "43px",
                width: "100%",
                fontSize: 18,
                marginTop: 38,
              }}
            >
              Sign in
            </Button>
          </Form.Item>
          <p style={{ marginTop: 38 }}>
            Don't have account? <span style={{ color: "blue" }}>Register</span>
          </p>
          <h3
            className="center"
            onClick={signIn}
            style={{ marginTop: 33, cursor: "pointer" }}
          >
            <img src={google} height={20} style={{ marginRight: 5 }} />
            Continue with Google
          </h3>
        </Form>
      </div>
    </div>
  );
}

export default Login;
