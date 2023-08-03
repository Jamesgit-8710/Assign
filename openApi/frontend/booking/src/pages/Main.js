import React from 'react'
import Book from '../components/Book'
import Details from '../components/Details'
import '../styles/main.css'

const Main = () => {
  return (
    <div className='main'>
        <Book/>
        <Details/>
    </div>
  )
}

export default Main