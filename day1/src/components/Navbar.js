import React from 'react'
import Search from './Search'
import '../styles/navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
        <h2 className='logo'>Zenmonk store</h2>
        <Search/>
    </div>
  )
}

export default Navbar