import React, { useEffect, useState } from 'react'
import OrderItem from './OrderItem'
import Item from './Item'
import axios from 'axios';

const Orders = () => {
  const id = localStorage.getItem('id');

  const [data, setData] = useState([]);

  useEffect(() => {
    const call = async() => {
      const res = await axios.post("http://localhost:8000/orderData");

      setData(res.data);
    }

    call();
  })

  return (
    <div style={{height: "calc(100vh - 216px)",width: "50vw", margin: "auto", backgroundColor: "white",overflow: "scroll",padding: "20px 40px 120px 40px",borderTop: "1px solid rgb(241, 243, 245)"}} className='cart'>
      <p style={{ fontSize: 25, fontWeight: 500, marginBottom: 40 }}>
        Orders
      </p>
      {
        data.map((i) => {
          if(i.user===id)
          return <Item item={i} show={false}/>
        })
      }
    </div>
  );
}

export default Orders