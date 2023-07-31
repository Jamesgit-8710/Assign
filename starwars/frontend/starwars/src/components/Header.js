import React from "react";
import "../styles/header.css";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";
import search from "../assets/search.png";
import user from "../assets/user.png";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTop">
        <div className="socialMediaList" >
          <img src={instagram} height={20} alt="instagram" className="icons" />
          <img src={twitter} height={20} alt="twitter" className="icons" />
          <img src={facebook} height={20} alt="facebook" className="icons" />
          <img src={youtube} height={20} alt="youtube" className="icons" />
          <div className="verticalLine"></div>
          <h5 className="kids">KIDS</h5>
        </div>
        <div className="logo"></div>
        <div style={{ display: "flex", paddingTop: 10}}>
          <div style={{display: "flex", color: "white"}}>
            <img src={search} height={18} style={{marginRight: 10}} alt="search"/>
            <h5>SEARCH</h5>
          </div>
          <div style={{display: "flex", marginLeft: 30, color: "white"}}>
            <img src={user} height={18} style={{marginRight: 10}} alt="profile"/>
            <h5>SIGN IN</h5>
          </div>
        </div>
      </div>
      <div>
        <div className="tabs">
          <h5>NEWS + FEATURES</h5>
          <h5>VIDEO</h5>
          <h5>FILMS</h5>
          <h5>SERIES</h5>
          <h5>INTERACTIVE</h5>
          <h5>COMMUNITY</h5>
          <h5>DATABANK</h5>
          <h5>DISNEY+</h5>
        </div>
      </div>
      <div className="horizontalLine"></div>
      {/* <hr/> */}
    </div>
  );
};

export default Header;
