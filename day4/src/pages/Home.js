import React from "react";
import "../styles/home.css";
import hills from "../assets/hills.jpg";
import Navbar from "../components/Navbar";
import MainBody from "../components/MainBody";
import List from "../components/List";

function Home() {
  return (
    <div style={{ backgroundImage: `url(${hills})`}} className="p">
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0)" }} className="ip">
        <Navbar />
        <MainBody/>
        <List/>
      </div>
    </div>
  );
}

export default Home;
