import React from 'react'
import '../styles/login.css'
import google from '../assets/google.png'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import { message } from 'antd';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../services/firbase.auth';
// import validator from 'validator'

const Login = ({ set }) => {

    const key = 'updatable';

    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async(values) => {
        // const x = values.username;
        // console.log('Success:', isNaN(values.username), x.length);

        const res = await axios.post('http://localhost:8000/check',{user: values.username,pass: values.password})

        if(res.data){
            localStorage.setItem('id', res.data)
            messageApi.open({
                key,
                type: 'success',
                content: 'Welcome!',
                duration: 2,
            });
        }else{
            // const res2 = await axios.post('http://localhost:8000/user',{user,pass,val})
            messageApi.open({
                key,
                type: 'warning',
                content: 'User not found!',
                duration: 2,
            });
        }

        // validator.isEmail(values.username)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const logInGoogle = async() => {
        await signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const res = await axios.post('http://localhost:8000/exist',{user: user.email})

        if(res.data){
            localStorage.setItem('id', res.data)
            messageApi.open({
                key,
                type: 'success',
                content: 'Welcome!',
                duration: 2,
            });
        }else{
            messageApi.open({
                key,
                type: 'warning',
                content: 'User not found!',
                duration: 2,
            });
        }
      }).catch((error) => {
        console.log(error);
      });
    }

    return (
        <div className='login'>
            {contextHolder}
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1 style={{ textAlign: "center", marginBottom: 50 }}>Hi, Welcome</h1>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please fill the input feild!' }]}
                >
                    <Input placeholder='email, phone number' style={{ height: 45 }} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Password must have at least 6 characters!', min: 6 }]}
                >
                    <Input.Password placeholder='password' style={{ height: 45 }} />
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{ height: 45, width: "100%", fontSize: 19 }}>
                        Login
                    </Button>
                </Form.Item>
                <p style={{ marginTop: 55, textAlign: "center" }}>
                    Don't have account?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => { set("flex") }}
                    >
                        Register
                    </span>
                </p>
                <h3
                    className="center"
                    onClick={logInGoogle}
                    style={{ marginTop: 45, cursor: "pointer", marginBottom: 45, fontSize: 19 }}
                >
                    <img
                        src={google}
                        height={23}
                        style={{ marginRight: 6 }}
                        alt="google"
                    />
                    Continue with Google
                </h3>
            </Form>
        </div>
    )
}

export default Login