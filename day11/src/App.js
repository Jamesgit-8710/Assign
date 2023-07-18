import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useSelector } from "react-redux";

function App() {

  const s = useSelector((state)=>state)
  
  let element=<Login/>

  if(s.users.User!==null)
  element=<Home/>

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={element} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
