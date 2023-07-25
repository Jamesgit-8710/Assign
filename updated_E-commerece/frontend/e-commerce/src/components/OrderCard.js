import React, { useEffect, useState } from 'react'
import { Button, Steps, message } from 'antd';
import iphone from '../assets/iphone.jpg'
import axios from 'axios';

const OrderCard = ({ item, show ,setU }) => {
    const [current, setCurrent] = useState(item.track - 1);
    const [user, setUser] = useState({});
    const [prod, setProd] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

    const key = 'updatable';

    const onChange = async (value) => {
        if (value > current) {
            const res = await axios.post(`${process.env.REACT_APP_PATH}updateTrack`, { id: item._id, data: value + 1 });

            if (value === 4) {
                const res = await axios.post(`${process.env.REACT_APP_PATH}updateOrder`, { id: item._id, data: 's' });
            }
            setCurrent(value);
        }
    };

    const cancel = async (e) => {
        const res = await axios.post(`${process.env.REACT_APP_PATH}updateOrder`, { id: item._id, data: 'c' });
        // const res2 = await axios.post("http://localhost:8000/d", { id: item.itemId, c: item.count });
        messageApi.open({
            key,
            type: "success",
            content: "Order canceled!",
            duration: 2,
        });
        setU(e);
    }

    useEffect(() => {
        const call = async () => {
            const res = await axios.post(`${process.env.REACT_APP_PATH}product`, { id: item.itemId });
            setProd(res.data);
            const res2 = await axios.post(`${process.env.REACT_APP_PATH}getUser`, { id: item.user });
            setUser(res2.data);

        }

        call();
    }, [])


    const description = <p style={{ opacity: 0 }}>content</p>;
    return (
        <div style={{ height: 297, width: show ? "45%" : "500px", minWidth: show ? "46rem" : 0, backgroundColor: "white", display: "flex", margin: "10px", padding: 10, borderRadius: 20 }}>
            {contextHolder}
            <div style={{ height: "100%", width: "100%", display: "flex", marginRight: 60, borderRight: "1px solid rgb(241, 243, 245)" }}>
                {/* <div style={{ backgroundImage: `url(${iphone})`, height: "100%", width: 270, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div> */}
                <div style={{ paddingLeft: 20 }}>
                    <p style={{ fontSize: 23, fontWeight: 500 }}>{prod[0]?.productName}</p>
                    <p style={{ fontSize: 20 }}>Pcs: <span style={{ color: "rgb(180, 180, 180)" }}>{item.count}</span>, Price: <span style={{ color: "rgb(180, 180, 180)" }}>&#8377;{item.price}</span></p>
                    <p style={{ fontWeight: 500, fontSize: 20, marginTop: 10 }}>
                        Total Amount: <span style={{ color: "rgb(180, 180, 180)" }}>&#8377;{item.price * item.count}</span>
                    </p>
                    <p style={{ fontWeight: 500, fontSize: 20, marginTop: 5 }}>
                        Ordered by: <span style={{ color: "rgb(180, 180, 180)" }}>{user.username}</span>
                    </p>
                    <p style={{ fontWeight: 500, fontSize: 20, marginTop: 25 }}>
                        Payment method: <span style={{ color: "rgb(180, 180, 180)" }}>{item.payMethod}</span>
                    </p>
                    <p style={{ height: "60px", fontWeight: 500, fontSize: 20, marginTop: 5, wordBreak: "break-word", overflow: "hidden" }}>
                        Address: <span style={{ color: "rgb(180, 180, 180)" }}>{item.address}</span>
                    </p>
                    <Button type="primary" style={{ marginTop: 5, height: 40, width: 200, display: show ? "block" : "none" }} onClick={cancel} danger ghost>
                        Cancel order
                    </Button>
                    {
                        item.status === 'c' ?
                            <p style={{ fontSize: 22, fontWeight: 500, color: "red", marginTop: 10 }}>Canceled</p>
                            : item.status === 's' ?
                                <p style={{ fontSize: 22, fontWeight: 500, color: "blue", marginTop: 10 }}>Delivered</p>
                                : ""
                    }
                </div>
            </div>
            <div style={{ width: "400px", display: show ? "block" : "none" }}>
                <Steps
                    current={current}
                    onChange={onChange}
                    direction="vertical"
                    items={[
                        {
                            title: 'Preparing',
                            description,
                        },
                        {
                            title: 'Dispatched',
                            description,
                        },
                        {
                            title: 'On the way',
                            description,
                        }, {
                            title: 'Arrive today',
                            description,
                        }, {
                            title: 'Delivered',
                            description,
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default OrderCard