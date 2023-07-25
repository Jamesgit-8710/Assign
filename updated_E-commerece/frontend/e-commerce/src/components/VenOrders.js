import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import axios from "axios";
import { Empty } from "antd";

const VenOrders = () => {
  const id = localStorage.getItem('id');
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [u, setU] = useState("")

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post(`${process.env.REACT_APP_PATH}orderData`);
      setData(res.data);

      const res2 = await axios.post(`${process.env.REACT_APP_PATH}Orderamount`,{id: id});
      setAmount(res2.data.sum);
    };

    getData();
  }, [u]);
  console.log(amount);

  const f = data.filter((i) => i.status==='d' && i.vendor===id)

  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
        width: "100vw",
        overflow: "scroll",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
      className="cart"
    >
      {f.length===0?<div style={{height: "50vh",width: "90%",backgroundColor: "white",paddingTop: 200,margin: "auto"}}><Empty description='No Orders'/></div>:
      data.map((i) => {
        if(i.status==='d' && i.vendor===id)
        return <OrderCard item={i} show={true} setU={setU}/>;
      })}
      <div style={{height: 100,width: "100vw"}}></div>
      <div style={{width: "100vw", backgroundColor: "white",position: "absolute",bottom: 0,fontSize: 25,fontWeight: 500,display: "flex", justifyContent: "space-between",padding: 15}}>
        <p style={{marginLeft: 20}}>Total orders amount:</p>
        <p style={{marginRight: 20}}>&#8377;{amount}</p>
      </div>
    </div>
  );
};

export default VenOrders;
