import React from 'react'
import '../styles/user.css'
import image from "../assets/sample.png";

const User = ({item,call}) => {
  return (
    <div className='user' onClick={() => {call(item)}}>
        <img src={item[0].image} height={40} width={43} style={{borderRadius: "50%"}}/>
        <p style={{margin: "6px 0px 0px 10px",fontWeight: "500"}}>{item[0].uName}</p>
    </div>
  )
}

export default User