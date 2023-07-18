import React from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const s = useSelector((state) => state);

  let element = <Login />;

  if(s.users.User !== null)
  element = <Main/>


  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={element} />
        <Route path={"/signup"} element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
