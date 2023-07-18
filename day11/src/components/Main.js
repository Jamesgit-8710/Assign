import React from "react";
import "../styles/home.css";
import { useLocation } from "react-router";

function Main() {
    const location = useLocation();
  const details = location.state;
  return (
    <div className="home">
      <div className="innerDiv">
        <h2>Welcome ! {details}</h2>
      </div>
    </div>
  );
}

export default Main;
