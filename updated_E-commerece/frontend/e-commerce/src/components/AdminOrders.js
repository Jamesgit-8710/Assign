import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard';
import { Empty } from 'antd';

const AdminOrders = () => {
  const [data, setData] = useState([]);
  let [amount, setAmount] = useState(0);
  const [u, setU] = useState("")
  useEffect(() => {
    const getData = async () => {
      const res = await axios.post(`${process.env.REACT_APP_PATH}orderData`);
      setData(res.data);

      const res2 = await axios.post(`${process.env.REACT_APP_PATH}allOrderamount`);
      setAmount(res2.data.sum);
    };

    getData();
  }, [u]);

  const f = data.filter((i) => i.status==='d')

  return (
    <div style={{height: "calc(100vh - 68px)", width: "calc(100vw - 256px)", backgroundColor: "rgb(241, 243, 245)",display: "flex",flexWrap: "wrap",overflow: "scroll",justifyContent: "center"}} className='cart'>
      {f.length===0?<div style={{height: "40%",width: "95%",backgroundColor: "white",paddingTop: 200,margin: "auto"}}><Empty description='No Order'/></div>:
      data.map((i) => {
        if(i.status==='d'){
        return <OrderCard item={i} show={true} setU={setU}/>;
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