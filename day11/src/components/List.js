import React, { useEffect, useState } from "react";
import "../styles/list.css";
import { Input } from "antd";
import Tile from "./Tile";
import { collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { db } from "../services/user.auth";
import { useSelector } from "react-redux";

function List({set}) {
  const [data, setData] = useState([]);

  const state = useSelector((state)=> state.users.User)
  
  useEffect(() => {
    const colRef = collection(db, "users");
    //real time update
    onSnapshot(colRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => {
        return [doc.data()]
      }))
    });

  },[]);

  return (
    <div className="list">
      <div
        className="center"
        style={{ padding: "20px 30px", backgroundColor: "#E2EEF7" }}
      >
        <Input
          placeholder="Search..."
          style={{ borderRadius: "100px", height: "35px" }}
        />
      </div>
      <div className="friendList">
        {
          data.map((item,index) =>
          state!==item[0].id ?
          (<Tile key={index} id={item[0].id}  name={item[0].name} set={set}/>)
          :
          null
          )
        }
        {/* <Tile/>
            <Tile/> */}
      </div>
    </div>
  );
}

export default List;
