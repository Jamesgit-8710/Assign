import React, { useEffect, useState } from 'react'
import Product from './Product';
import axios from 'axios';
import { Empty } from 'antd';

const BestSeller = ({set}) => {
  const [data, setData] = useState([]);
  const [u, setU] = useState("");

  const f = data.filter((i) => i.sellCount>5)

  useEffect(() => {
    const call = async() => {
      const res = await axios.post(`${process.env.REACT_APP_PATH}getProduct`);
      setData(res.data);
    }

    call();
  }, [u])

  return (
    <div style={{ height: "calc(100vh - 76px)", width: "100vw", margin: "auto", backgroundColor: "rgb(241, 243, 245)",overflow:"scroll",display: "flex",flexWrap: "wrap"}} className='cart'>
      {f.length===0?<div style={{height: "60vh",width: "95vw",backgroundColor: "white",paddingTop: 200,margin: "auto"}}><Empty description='No Best selling product right now!'/></div>:
      data.map((i) => {
        if(i.sellCount>5)
        return <Product item={i} show={true} set={set} setU={setU}/>;
      })}
    </div>
  )
}

export default BestSeller