import React, { useState } from 'react'
import Main from './Main';

function Button() {

    const [item ,updated]=useState(false);

    const shoot = () => {
        updated(true)
    }

  return (
    <>
    <button onClick={shoot}>Login</button>
    <Main value={item}/>
    </>
  )
}

export default Button
