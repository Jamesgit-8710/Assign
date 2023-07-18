import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/navbar.css'

function Deleted() {
  const {task} = useParams();
  const arr = JSON.parse(task)
  return (
    <>
    <div className='outerBody'>
      <h2 className="heading">Deleted</h2>
      <div className='innerBody'>
        {arr.map((e) => {
            return <div className='todo'>{e}</div>
        })}
      </div>
    </div>
    </>
  )
}

export default Deleted