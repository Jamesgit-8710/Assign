import React from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import '../styles/home.css'

function Home() {
  return (
    <div className='home'>
        <Navbar/>
        <Main/>
    </div>
  )
}

export default Home