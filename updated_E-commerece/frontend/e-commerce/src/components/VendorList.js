import React, { useEffect, useState } from 'react'
import VendorCard from './VendorCard'
import axios from 'axios';
import { Empty } from 'antd';

const VendorList = () => {
  const id = localStorage.getItem("id");

  const [data, setData] = useState([])
  useEffect(() => {
    const call = async() => {
      const res = await axios.post(`${process.env.REACT_APP_PATH}allUsers`);

      setData(res.data);

      // console.log(res.data);
    }

    call();
  },[])

  console.log(data);

  const f = data.filter((i) => i.prof==='v')

  return (
    <div style={{height: "calc(100vh - 68px)", width: "calc(100vw - 256px)", overflow: "scroll"}} className='cart'>
      {f.length===0?<div style={{height: "30%",width: "100%",backgroundColor: "white",paddingTop: 200,margin: "auto"}}><Empty description='No Vendor'/></div>:
        data.map((i) => {
          if(i.prof==='v')
          return <VendorCard item={i}/>
        })
      }
      
    </div>
  )
}

export default VendorList