import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/navbar.css'

function Completed() {
  const {task} = useParams();
  const arr = JSON.parse(task)
  return (
    <>
    <div className='outerBody'>
      <h2 className="heading">Completed</h2>
      <div className='innerBody'>
        {arr.map((e) => {
            return <div className='todo'>{e}</div>
        })}
      </div>
    </div>
    </>
  )
}

export default Completed