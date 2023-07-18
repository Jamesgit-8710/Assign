import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Data from "./components/Data";

const App = () => {
  //  const [val, setVal] = useState(1);

  return (
    <div style={{ display: "flex",flexDirection: "column", justifyContent: "center", marginTop: 0 ,textAlign: "center"}}>


      <Data/>



      {/* {
        val?
        <>
        <Login/>
      <h4 onClick={() => {setVal(0)}} style={{cursor: "pointer"}}>Sign up</h4>
        </>
        :

      <>
      <Signup/>
      <h4 onClick={() => {setVal(1)}} style={{cursor: "pointer"}}>Log in</h4>
      </>
      } */}
      
    </div>
  );
};

export default App;
