import { Button, Form, Input } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { message } from "antd";

const Profile = ({ userData }) => {
    const [dis, setDis] = useState(true);
    const [vis, setVis] = useState("none");
    const id = localStorage.getItem('id');
    const [user, setUser] = useState(userData.username);
    const [pass, setPass] = useState(userData.password);
    const [messageApi, contextHolder] = message.useMessage();

    const key = "updatable";

    const onFinish = async () => {
        if (pass !== "") {
            
            messageApi.open({
                key,
                type: "success",
                content: "Updated!",
                duration: 2,
            });

            const res = await axios.post("http://localhost:8000/updateUser", { id: id, data: { password: pass } });
            
            setDis(true);
            setVis("none");
        } else {
            messageApi.open({
                key,
                type: "warning",
                content: "Found empty feild!",
                duration: 2,
            });
        }
    }

    return (
        <div style={{ height: "calc(100vh - 105px)", width: "60vw", margin: "auto", backgroundColor: "white", paddingTop: 30, borderTop: "1px solid rgb(241, 243, 245)" }}>
            {contextHolder}
            <div style={{ height: 140, width: 140, borderRadius: "50%", backgroundColor: "grey", margin: "auto" }}></div>
            <div style={{ backgroundColor: "white", width: "50%", margin: "auto", marginTop: 40 }}>
                <Form.Item >
                    <Button style={{ width: "100px", float: "right" }} onClick={() => { setDis(false); setVis("block"); }}>
                        Enable
                    </Button>
                </Form.Item>
                <Form disabled={dis} onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please fill the input feild!' }]}
                        initialValue={user}
                    >
                        <Input placeholder='email, phone number' style={{ height: 45 }} disabled={true} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Password must have at least 6 characters!', min: 6 }]}
                        initialValue={pass}
                    >
                        <Input.Password placeholder='password' style={{ height: 45 }} onChange={(e) => { setPass(e.target.value) }} />
                    </Form.Item>

                    <Form.Item style={{display: vis}}>
                        <Button type="primary" htmlType="submit" style={{ height: 45, width: "100%", fontSize: 19 }}>
                            Update
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Profile