import React, { useEffect, useState } from 'react'
import Login from './pages/Login'
import axios from 'axios'
import Home from './pages/Home';

const App = () => {

  const [sessionStatus ,setSessionStatus] = useState(false);

  useEffect(()=>{
    const callApi = async() => {
      const res = await axios.get("http://localhost:8000/checkSession");
      setSessionStatus(res.data);
    }

    callApi();
  },[])

  return (
    <div>
      {
        sessionStatus? 
        <Home/>
        :
        <Login/>
      }
    </div>
  )
}

export default App