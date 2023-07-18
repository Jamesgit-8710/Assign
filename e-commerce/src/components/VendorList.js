import React, { useEffect, useState } from 'react'
import VendorCard from './VendorCard'
import axios from 'axios';

const VendorList = () => {
  const id = localStorage.getItem("id");

  const [data, setData] = useState([])
  useEffect(() => {
    const call = async() => {
      const res = await axios.post('http://localhost:8000/allUsers');

      setData(res.data);

      // console.log(res.data);
    }

    call();
  },[])

  console.log(data);

  return (
    <div style={{height: "calc(100vh - 68px)", width: "calc(100vw - 256px)", overflow: "scroll"}} className='cart'>
      {
        data.map((i) => {
          if(i.prof==='v')
          return <VendorCard item={i}/>
        })
      }
      
    </div>
  )
}

export default VendorList