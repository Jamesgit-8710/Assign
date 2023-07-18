import React from 'react'
import { Outlet, Link } from "react-router-dom";
import '../styles/filters.css'

function Filters({delArr,comArr}) {
  
  return (
    <>
    <div className='filters'>
        <button className='button'>
          <Link to={`/deleted/${JSON.stringify(delArr)}`}>
            Deleted Items
          </Link>
        </button>
        <button className='button2'>
          <Link to={`/completed/${JSON.stringify(comArr)}`}>
            Completed Items
          </Link>
        </button>
    </div>
    <Outlet />
    </>
  )
}

export default Filters