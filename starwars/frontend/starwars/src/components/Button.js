import React from 'react'
import "../styles/btn.css";

const Button = ({bgColor,color,text}) => {
  return (
    <div>
        <button className='btn' style={{backgroundColor: bgColor, color: color}}>{text}</button>
    </div>
  )
}

export default Button