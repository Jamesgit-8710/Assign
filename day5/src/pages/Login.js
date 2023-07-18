import React, { useState } from "react";
import { Radio } from "antd";
import "../styles/login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function Login() {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info("Not a valid user!");
  };

  const [value, setValue] = useState("e");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [next, setNext] = useState("");

  const onAccessChange = (event) => {
    if (user === "" || pass === "") {
      //console.log("fields are empty");
    } else {
      const x = JSON.parse(localStorage.getItem("users"));

      if (x !== null) {
        let flag = 0;
        let i = -1;

        {
          x.map((e, index) => {
            if (e.u == user && e.p == pass && e.prof == event.target.value) {
              console.log("login Successful!");
              flag = 1;
              i = index;
            }
          });
        }

        if (flag) {
          setNext("/home");
          localStorage.setItem("currUser", JSON.stringify(i));
        } else {
          setNext("");
          localStorage.removeItem("currUser");
        }
      }
    }

    setValue(event.target.value);
  };

  const onUserChange = (event) => {
    if (event.target.value === "" || pass === "") {
      //console.log("fields are empty");
    } else {
      const x = JSON.parse(localStorage.getItem("users"));

      if (x !== null) {
        let flag = 0;
        let i = -1;

        {
          x.map((e, index) => {
            if (e.u == event.target.value && e.p == pass && e.prof == value) {
              console.log("login Successful!");
              flag = 1;
              i = index;
            }
          });
        }

        if (flag) {
          setNext("/home");
          localStorage.setItem("currUser", JSON.stringify(i));
        } else {
          setNext("");
          localStorage.removeItem("currUser");
        }
      }
    }

    setUser(event.target.value);
  };

  const onPassChange = (event) => {
    if (user === "" || event.target.value === "") {
      //console.log("fields are empty");
    } else {
      const x = JSON.parse(localStorage.getItem("users"));

      if (x !== null) {
        let flag = 0;
        let i = -1;

        {
          x.map((e, index) => {
            if (e.u == user && e.p == event.target.value && e.prof == value) {
              console.log("login Successful!");
              flag = 1;
              i = index;
            }
          });
        }

        if (flag) {
          setNext("/home");
          localStorage.setItem("currUser", JSON.stringify(i));
        } else {
          setNext("");
          localStorage.removeItem("currUser");
        }
      }
    }
    setPass(event.target.value);
  };

  //const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const submit = () => {
    const x = JSON.parse(localStorage.getItem("users"));

    let i = 0;

    {
      x.map((e) => {
        if (e.u === user && e.p === pass && e.prof === value) {
          i = 1;
        }
      });
    }

    if (!i && user !== "" && pass !== "") {
      info();
    }

    navigate(next, { replace: true });
  };

  const signupPage = () => {
    navigate("/signup", { replace: true });
  };

  return (
    <div className="login">
      {contextHolder}

      <div className="logDiv">
        <div className="leftDiv">
          <h2 style={{ marginBottom: 25, color: "rgb(65, 65, 65)" }}>LOG IN</h2>

          <div className="inputs">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              // onFinish={console.log("successful")}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  className="input"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  onChange={onUserChange}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  className="input"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={onPassChange}
                />
              </Form.Item>
              <Radio.Group
                onChange={onAccessChange}
                className="radio"
                value={value}
              >
                <Radio value={"e"}>User</Radio>
                <Radio value={"a"}>Admin</Radio>
              </Radio.Group>
              <br />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={submit}
                  style={{ marginTop: 40 }}
                >
                  Log in
                </Button>
              </Form.Item>
              or <a onClick={signupPage}>register now!</a>
            </Form>
          </div>
        </div>
        {/* <div className="rightDiv"></div> */}
      </div>
    </div>
  );
}

export default Login;
