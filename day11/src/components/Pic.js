import React from 'react'
import '../styles/pic.css'

function Pic({img}) {
  return (
    <img src={img} height={40} style={{borderRadius: "50%"}} alt='pic'/>
  )
}

export default Pic