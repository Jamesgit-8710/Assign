import React, { useState } from 'react'
import '../styles/loginSignup.css'
import logo from '../assets/shopify.png'
import shop from '../assets/banner.jpg'
import Login from '../components/Login'
import close from '../assets/close.png'
import { Radio } from 'antd';
import { Button } from 'antd';
import Signup from '../components/Signup'
import { message } from 'antd';

const LoginSignup = () => {

    const [messageApi, contextHolder] = message.useMessage();

    const key = 'updatable';

    const [vis, setVis] = useState("none");

    const [value, setValue] = useState("");

    const [change, setChange] = useState(0);

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const size = 'large';

    return (
        <div className='background'>
            {contextHolder}
            <div className='left'>
                <div style={{ display: "flex", padding: "20px 40px" }}>
                    <img src={logo} height={39} alt='logo' />
                    <h2 style={{ marginLeft: 8, fontSize: 27, color: "#000F43" }}>Shopcart</h2>
                </div>
                <div className='innerDiv center'>
                    {
                        change ?
                            <Signup set={setChange} val={value}/>
                            :
                            <Login set={setVis} />
                    }
                </div>
            </div>
            <div className='right center' style={{ flexDirection: "column" }}>
                <div style={{ width: "70%" }}>
                    <div style={{ height: "50vh", backgroundColor: "white", backgroundImage: `url(${shop})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", borderRadius: "60px 0px 60px 0px" }}>

                    </div>
                    <h2 style={{ color: "white", fontWeight: 500, marginTop: 30 }}>Checkout New Arrivals</h2>
                    <p style={{ color: "white", marginTop: 10 }}>Log in to your existing Volusion storefront dashboard by entering the email address associated with your account below. Log in to your existing Volusion storefront dashboard by entering the email address associated with your account below.</p>
                </div>
            </div>
            <div style={{ height: "100vh", width: "100vw", position: "fixed", backgroundColor: "rgba(0,0,0,0.6  )", display: vis, flexDirection: "column" }}>
                <img src={close} height={18} width={18} alt='close' onClick={() => { setVis("none"); setValue(""); }} style={{ margin: "15px 20px 0px auto" }} />
                <div style={{ width: "50vw", backgroundColor: "white", margin: "auto", padding: "30px 50px" }}>
                    <h2 style={{ fontWeight: 500 }}>Which of these best describes you?</h2>
                    <Radio.Group onChange={onChange} value={value} style={{ width: "100%", display: "flex", justifyContent: "space-between", marginTop: 40 }}>

                        <div style={{ width: "40%", border: "1px solid black", borderRadius: 10, padding: 20 }}>
                            <Radio value={"v"}>I'm a vendor</Radio>
                        </div>

                        <div style={{ width: "40%", border: "1px solid black", borderRadius: 10, padding: 20 }}>
                            <Radio value={"c"}>I'm a costumer</Radio>
                        </div>

                    </Radio.Group>
                    <Button type="primary" size={size} style={{ float: "right", marginTop: "20%", padding: "0 30px" }} onClick={() => {
                        if (value !== "") { setChange(1); setVis("none"); } else {
                            messageApi.open({
                                key,
                                type: 'warning',
                                content: 'Please select the option below!',
                                duration: 2,
                            });
                        }
                    }}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup