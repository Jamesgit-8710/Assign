import React, { useState } from "react";
import { Radio } from "antd";
import "../styles/login.css";
import "../styles/signup.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from 'axios';

function SignUp() {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info("successful");
  };

  const [value, setValue] = useState("e");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  // const [path, setPath] = useState("");

  const onAccessChange = (e) => {
    setValue(e.target.value);
  };

  const onUserChange = (e) => {
    setUser(e.target.value);
  };

  const onPassChange = (e) => {
    setPass(e.target.value);
  };

  // const [items, setItems] = useState([]);

  // Important

  // useEffect(() => {
  //   const x = JSON.parse(localStorage.getItem("users"));
  //   console.log(x)
  //   if (x !== null)
  //     setItems([...x]);
  // }, []);

  // const set = (e) => {
  //   setItems([...e, { u: user, p: pass, prof: value }])
  // }

  // const set2 = () => {
  //   setItems([{ u: user, p: pass, prof: value }])
  // }

  const submit = async() => {
    const x = JSON.parse(localStorage.getItem("users"));

    if (user === "" || pass === "") {
      //console.log("fields are empty");
    } else {
      if (x !== null) {
        const temp = [...x, { u: user, p: pass, prof: value }];

        info();
        
        const delay = 1000;
        
        const navigateWithDelay = () => {
          navigate("/login", { replace: true });
        };
        
        setTimeout(navigateWithDelay, delay);
        
        localStorage.setItem("users", JSON.stringify(temp));

        const res = await axios.post('http://localhost:8000/signUp',{ u: user, p: pass, prof: value });
      } else {
        const temp = [{ u: user, p: pass, prof: value }];
        info();

        const delay = 1000; 

        const navigateWithDelay = () => {
          navigate("/login", { replace: true });
        };

        setTimeout(navigateWithDelay, delay);

        localStorage.setItem("users", JSON.stringify(temp));

        const res = await axios.post('http://localhost:8000/signUp',{ u: user, p: pass, prof: value });
      }
    }
  };

  const navigate = useNavigate();

  const loginPage = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="login">
      {contextHolder}
      <div className="logDiv">
        {/* <div className="leftDiv signLeft"></div> */}
        <div className="rightDiv signRight">
          <h2 style={{ marginBottom: 25, color: "rgb(65, 65, 65)" }}>
            CREAT NEW ACCOUNT
          </h2>

          <div className="inputs">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={console.log("successful")}
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
                  value={user}
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
                  value={pass}
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
                  CREATE
                </Button>
              </Form.Item>
              Aready have account? <a onClick={loginPage}>login</a>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
