import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard';

const AdminOrders = () => {
  const [data, setData] = useState([]);
  let [amount, setAmount] = useState(0);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("http://localhost:8000/orderData");
      setData(res.data);

      const res2 = await axios.post("http://localhost:8000/allOrderamount");
      setAmount(res2.data.sum);
    };

    getData();
  }, []);

  return (
    <div style={{height: "calc(100vh - 68px)", width: "calc(100vw - 256px)", backgroundColor: "rgb(241, 243, 245)",display: "flex",flexWrap: "wrap",overflow: "scroll",justifyContent: "center"}} className='cart'>
      {data.map((i) => {
        if(i.status==='d'){
        return <OrderCard item={i} />;
        }
      })}
      <div style={{height: 100,width: "100vw"}}></div>
      <div style={{width: "calc(100vw - 286px)", backgroundColor: "white",position: "absolute",bottom: 0,fontSize: 25,fontWeight: 500,display: "flex", justifyContent: "space-between",padding: 15}}>
        <p style={{marginLeft: 20}}>Total orders amount:</p>
        <p style={{marginRight: 20}}>&#8377;{amount}</p>
      </div>
    </div>
  )
}

export default AdminOrders