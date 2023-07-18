import React, { useEffect, useState } from "react";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import Vendor from "./pages/Vendor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";

const App = () => {
  const [element, setElement] = useState(<LoginSignup />);

  useEffect(() => {
    const x = localStorage.getItem("id");

    if (x !== null) {
      setElement(<Home />)
    }
  },[]);


  return (
    // <LoginSignup/>
    // <Home/>
    // <Admin/>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={element} />
        <Route path="/vendor" element={<Vendor />} />
      </Routes>
    </BrowserRouter>


    // <Vendor/>
  );
};

export default App;
