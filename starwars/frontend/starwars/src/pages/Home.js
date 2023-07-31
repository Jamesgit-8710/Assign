import React from 'react'
import '../styles/home.css'
import Header from '../components/Header'
import Main from '../components/Main'

const Home = () => {
  return (
    <div className='mainBackground'>
        <Header/>
        <Main/>
    </div>
  )
}

export default Home