import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from '../components/Navbar'
import Deleted from './Deleted'
import Completed from './Completed'

function Home() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Navbar />} />
          <Route path="/deleted/:task" element={<Deleted />} />
          <Route path="/completed/:task" element={<Completed />} />
      </Routes>
    </BrowserRouter>
    // <div>
    //     <Navbar/>
    // </div>
  )
}

export default Home