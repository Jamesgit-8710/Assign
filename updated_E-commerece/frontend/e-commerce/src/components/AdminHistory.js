import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard';

const AdminHistory = () => {
    const id = localStorage.getItem('id')
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post(`${process.env.REACT_APP_PATH}orderData`);
      setData(res.data);
    };

    getData();
  }, []);
    return (
        <>
            <h2 style={{ margin: "10px 0px 15px 12px" }}>History</h2>

            <div style={{ height: "calc(100vh - 143px)", width: "100vw", overflow: "scroll", display: "flex", flexWrap: "wrap", justifyContent: "center" }} className='cart'>
                {data.map((i) => {
                    if ((i.status === 'c' || i.status === 's') && i.vendor === id)
                        return <OrderCard item={i} show={false} />;
                })}
            </div>
        </>
    )
}

export default AdminHistory