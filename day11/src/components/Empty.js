import React from 'react'
import empty from '../assets/empty.jpg'

function Empty() {
  return (
    <div style={{width: "50%",flexDirection: "column",justifyContent: "space-evenly",color: "rgb(0,0,0,0.5)"}} className='center'>
      <h2 style={{marginTop: 20}}>Start your conversation</h2>
      <img src={empty} style={{width: "70%"}}/>
    </div>
  )
}

export default Empty