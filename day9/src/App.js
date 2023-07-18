import React from 'react'
import Login from './pages/Login'
import OTP from './pages/OTP'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from './pages/Create';
import { useSelector } from 'react-redux';

function App() {

  const verified = useSelector((state) => state)

  let element = <Login/>;
  let element2 = "";

  if(verified.otp.otpp){
    element = <Home/>
    element2=<Create/>
  }else if(verified.users.status==="otp"){
    element = <OTP/>
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={element} />
          <Route path={'/create'} element={element2} />
        </Routes>
      </BrowserRouter>
      {/* <Home/> */}
    </div>
  )
}

export default App