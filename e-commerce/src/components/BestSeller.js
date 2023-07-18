import React, { useEffect, useState } from 'react'
import Product from './Product';
import axios from 'axios';

const BestSeller = ({set}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const call = async() => {
      const res = await axios.post("http://localhost:8000/getProduct");
      setData(res.data);
    }

    call();
  }, [])

  return (
    <div style={{ height: "calc(100vh - 76px)", width: "100vw", margin: "auto", backgroundColor: "rgb(241, 243, 245)",overflow:"scroll",display: "flex",flexWrap: "wrap"}} className='cart'>
      {data.map((i) => {
        if(i.sellCount>5)
        return <Product item={i} show={true} set={set} />;
      })}
    </div>
  )
}

export default BestSeller