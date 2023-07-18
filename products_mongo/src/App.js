import { useState , useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [home,setHome] = useState(<Login />)

  useEffect(() => {
    const x = JSON.parse(localStorage.getItem("currUser"));
    if(x!==null)
    setHome(<Home />)
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={home} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
