import axios from 'axios';
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard';
import { Empty } from 'antd';

const VenHistory = ({ordrVis}) => {
  const id = localStorage.getItem('id')
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("http://localhost:8000/orderData");
      setData(res.data);
    };

    getData();
  }, []);

  const f = data.filter((i) => (i.status === 'c' || i.status === 's') && i.vendor === id)

  return (
    <>
      <h2 style={{margin: "10px 0px 15px 12px"}}>History</h2>

      {ordrVis? 
      <div style={{ height: "calc(100vh - 143px)", width: "calc(100vw - 257px)",overflow: "scroll",display: "flex", flexWrap: "wrap",justifyContent: "center",margin: "auto",backgroundColor: "rgb(241, 243, 245)"}} className='cart'>
      {data.map((i) => {
        if (i.status === 'c' || i.status === 's')
          return <OrderCard item={i} show={false}/>;
      })}
    </div>
    :
      <div style={{ height: "calc(100vh - 143px)", width: "calc(100vw - 257px)",overflow: "scroll",display: "flex", flexWrap: "wrap",justifyContent: "center",margin: "auto",backgroundColor: "rgb(241, 243, 245)"}} className='cart'>
        {f.length===0?<div style={{height: "60%",width: "100%",backgroundColor: "white",paddingTop: 200,margin: "auto"}}><Empty description='No history!'/></div>:
        data.map((i) => {
          if ((i.status === 'c' || i.status === 's') && i.vendor === id)
            return <OrderCard item={i} show={false}/>;
        })}
      </div>}
    </>
  )
}

export default VenHistory