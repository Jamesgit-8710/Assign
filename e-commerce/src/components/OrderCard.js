import React, { useEffect, useState } from 'react'
import { Button, Steps } from 'antd';
import iphone from '../assets/iphone.jpg'
import axios from 'axios';

const OrderCard = ({item}) => {
    const [current, setCurrent] = useState(item.track-1);
    const [user, setUser] = useState({});
    const [prod, setProd] = useState([]);

    const onChange = async(value) => {
        const res = await axios.post("http://localhost:8000/updateTrack", {id: item._id,data: value+1});
        if(value===4){
            const res = await axios.post("http://localhost:8000/updateOrder", { id: item._id, data: 's' });
        }
        setCurrent(value);
    };

    const cancel = async() => {
        const res = await axios.post("http://localhost:8000/updateOrder", { id: item._id, data: 'c' });
    }

    useEffect(() => {
        const call = async() => {
            const res = await axios.post("http://localhost:8000/product", {id: item.itemId});
            setProd(res.data);
            const res2 = await axios.post("http://localhost:8000/getUser", {id: item.user});
            setUser(res2.data);

        }

        call();
    },[])


    const description = <p style={{ opacity: 0 }}>content</p>;
    return (
        <div style={{ height: 297, width: "45%",minWidth: "46rem", backgroundColor: "white", display: "flex", margin: "10px" ,padding: 10,borderRadius: 20}}>
            <div style={{ height: "100%", width: "100%", display: "flex",marginRight: 60,borderRight: "1px solid rgb(241, 243, 245)"}}>
                {/* <div style={{ backgroundImage: `url(${iphone})`, height: "100%", width: 270, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}></div> */}
                <div style={{ paddingLeft: 20 }}>
                    <p style={{ fontSize: 23, fontWeight: 500}}>{prod[0]?.productName}</p>
                    <p style={{ color: "rgb(180, 180, 180)", fontSize: 20 }}>Pcs: {item.count}, Price: &#8377;{item.price}</p>
                    <p style={{ fontWeight: 500, fontSize: 20, marginTop: 10 }}>
                    Total Amount: {item.price*item.count}
                    </p>
                    <p style={{ fontWeight: 500, fontSize: 20, marginTop: 5 }}>
                    Ordered by: {user.username}
                    </p>
                    <p style={{ fontWeight: 500, fontSize: 20, marginTop: 25 }}>
                    Payment method: {item.payMethod}
                    </p>
                    <p style={{ fontWeight: 500, fontSize: 20, marginTop: 5 }}>
                    Address: {item.address}
                    </p>
                    <Button type="primary" style={{ marginTop: 25, height: 40, width: 200 }} onClick={cancel} danger ghost>
                        Cancel order
                    </Button>
                </div>
            </div>
            <div style={{ width: "400px" }}>
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