import React, { useEffect, useState } from "react";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import Vendor from "./pages/Vendor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import { useSelector } from "react-redux";

const App = () => {
  // const [element, setElement] = useState(<LoginSignup />);
  let element = <LoginSignup />;

  const prof = useSelector((state) => state.users.prof);

  if (prof === 'c' || prof === 'v')
    element = <Home />
  else if (prof === 'a')
    element = <Admin />

  return (
    // <LoginSignup/>
    // <Home/>
    // <Admin/>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={element} />
        {
          prof === 'v' ?
            <Route path="/vendor" element={<Vendor />} />
            : ""
        }
      </Routes>
    </BrowserRouter>


    // <Vendor/>
  );
};

export default App;
