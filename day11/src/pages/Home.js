import React, { useState } from 'react'
import '../styles/home.css'
import Nav from '../components/Nav'
import List from '../components/List'
import Chat from '../components/Chat'
import Empty from '../components/Empty'
import { useSelector } from 'react-redux'

function Home() {
  const [val, setVal] = useState("");

  const state = useSelector((state) => state)

  const set = (e) => {
    setVal(e)
    // console.log(e)

  }

  return (
    <div className='home center'>
      <div className='main'>
        <Nav />
        <List set={set} />
        {
          val !== "" ?
            <Chat id={val} /> :
            <Empty />
        }

      </div>
    </div>
  )
}

export default Home