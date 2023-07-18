import React from 'react'
import '../styles/login.css'
import google from '../assets/google.png'
import { Button, Form, Input } from 'antd';
import validator from 'validator'
import { message } from 'antd';
import { auth, provider } from '../services/firbase.auth';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

const Signup = ({ set , val }) => {

    const key = 'updatable';

    const [messageApi, contextHolder] = message.useMessage();

    const signupWithemailandpass = (user, pass) => {
        // console.log(user, pass);
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });

        createUserWithEmailAndPassword(auth, user, pass)
            .then(async(userCredential) => {
                // const user = userCredential.user;
                messageApi.open({
                    key,
                    type: 'success',
                    content: 'Successful',
                    duration: 2,
                });

                const res = await axios.post('http://localhost:8000/user',{user,pass,val})
            })
            .catch((error) => {
                const errorCode = error.code;

                if (errorCode === 'auth/email-already-in-use') {
                    messageApi.open({
                        key,
                        type: 'warning',
                        content: 'User already exist!',
                        duration: 2,
                    });
                    // info("User already in exist!")
                } else {
                    messageApi.open({
                        key,
                        type: 'warning',
                        content: 'Something went wrong!',
                        duration: 2,
                    });
                    // info("Something went wrong!")
                }
                console.log(errorCode);
                // ..
            });
    }

    const signupWithPhone = async (user, pass) => {
        messageApi.open({
            key,
            type: 'loading',
            content: 'Loading...',
        });

        const res = await axios.post('http://localhost:8000/exist',{user})

        if(res.data){
            messageApi.open({
                key,
                type: 'warning',
                content: 'User already exist!',
                duration: 2,
            });
        }else{
            const res2 = await axios.post('http://localhost:8000/user',{user,pass,val})
            messageApi.open({
                key,
                type: 'success',
                content: 'Successful',
                duration: 2,
            });
        }

    }

    const onFinish = (values) => {

        const val = values.username;

        if (isNaN(values.username)) {
            if (validator.isEmail(values.username)) {
                signupWithemailandpass(values.username, values.password)
            } else {
                // info("Not a valid Email!");
                messageApi.open({
                    key,
                    type: 'warning',
                    content: 'Not a valid Email!',
                    duration: 2,
                });
            }
        } else {
            if (val.length === 10) {
                signupWithPhone(values.username, values.password)
            } else {
                // info("Phone number must have at least 10 digits!")
                messageApi.open({
                    key,
                    type: 'warning',
                    content: 'Phone number contains only 10 digits!',
                    duration: 2,
                });
            }
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
            messageApi.open({
                key,
                type: 'warning',
                content: 'User already exist!',
                duration: 2,
            });
        }else{
            console.log(val)
            const res2 = await axios.post('http://localhost:8000/user',{user: user.email, pass: "", val: val})
            messageApi.open({
                key,
                type: 'success',
                content: 'Successful',
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
                <h1 style={{ textAlign: "center", marginBottom: 50 }}>CREATE NEW ACCOUNT</h1>
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
                        CREATE
                    </Button>
                </Form.Item>
                <p style={{ marginTop: 55, textAlign: "center" }}>
                    Already have account?{" "}
                    <span
                        style={{ color: "blue", cursor: "pointer" }}
                        onClick={() => { set(0) }}
                    >
                        Login
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
                    Signup with Google
                </h3>
            </Form>
        </div>
    )
}

export default Signup