import React from "react";
import "../styles/login.css";
import { Button, Form, Input } from "antd";
import google from "../assets/google.png";
import coloredText from "../assets/coloredText.webp";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/user.auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/user.slice";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const info = (e) => {
    messageApi.info(e);
  };

  const logInGoogle = async () => {
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
              uName: user.displayName,
              email: user.email,
              image: user.photoURL,
            });
          } else {
            // let i = "";
            // querySnapshot.forEach((doc) => {
            //   i=doc.id;
            // });
          }
        } catch (e) {
          console.log(e);
        }

        // navigate('/main',{ state: user.displayName})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const register = () => {
    navigate("/signup");
  };

  const onFinish = (e) => {
    const email = e.email;
    const pass = e.password;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log("chal gya")
        dispatch(addUser(user.uid))
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if(errorCode==="auth/user-not-found")
        info("user not found")
        else if(errorCode==="auth/wrong-password")
        info("wrong password")
        else
        info("invalid")

      });
  };

  return (
    <div className="backGround center">
      {contextHolder}
      <div className="innerDiv">
        <img src={coloredText} alt="instagram" height={80} />
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          //   onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{ margin: 0, padding: 0 }}
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              id="email"
              type="email"
              placeholder="email"
              style={{ height: 40, marginTop: 45 }}
            />
          </Form.Item>
          <Form.Item
            style={{ margin: 0, padding: 0 }}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              id="password"
              type="text"
              placeholder="password"
              style={{ height: 40, marginTop: 25 }}
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
              Log in
            </Button>
          </Form.Item>
          <p style={{ marginTop: 55 }}>
            Don't have account?{" "}
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={register}
            >
              Register
            </span>
          </p>
          <h3
            className="center"
            onClick={logInGoogle}
            style={{ marginTop: 45, cursor: "pointer", marginBottom: 45 }}
          >
            <img
              src={google}
              height={20}
              style={{ marginRight: 5 }}
              alt="google"
            />
            Continue with Google
          </h3>
        </Form>
      </div>
    </div>
  );
};

export default Login;
