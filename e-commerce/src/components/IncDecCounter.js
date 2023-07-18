import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import axios from 'axios';

const IncDecCounter = ({n,qty,set,itemId,awoke}) => {

    useEffect(() => {
        set(n);
    },[])

    const id = localStorage.getItem('id');

    let [num, setNum] = useState(n);

    let incNum = async() => {
        if (num < qty) {
            setNum(Number(num) + 1);
            set(Number(num) + 1)

            awoke(num);

            const res = await axios.post("http://localhost:8000/updateItem",{id: id,data: Number(num) + 1,itemId: itemId});
        }
    };

    let decNum = async() => {
        if (num > 1) {
            setNum(num - 1);
            set(Number(num) - 1)

            awoke(num);

            const res = await axios.post("http://localhost:8000/updateItem",{id: id,data: Number(num) - 1,itemId: itemId});
        }
    }

    let handleChange = (e) => {
        setNum(e.target.value);
    }

    return (
        <>
            <div style={{display: "inline-block", marginTop: 33}}>
                <div style={{ display: "flex" }}>
                    <div>
                        <Button type="primary" onClick={decNum} ghost>
                            -
                        </Button>
                    </div>
                    <p style={{fontSize: 25,margin: "0px 6px"}}>{num}</p>
                    <div>
                        <Button type="primary" onClick={incNum} ghost>
                            +
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IncDecCounter