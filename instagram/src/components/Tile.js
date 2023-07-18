import React, { useEffect, useState } from "react";
import sample from "../assets/sample.png";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/user.auth";

const Tile = ({ item , a }) => {
  //   console.log(item);
  const [data, setData] = useState([]);

  useEffect(() => {
    const notRef = query(collection(db, "users"), where("id", "==", item));

    onSnapshot(notRef, (snapshot) => {
      setData(
        snapshot.docs.map((doc) => {
          return doc.data();
        })
      );
    });
  }, []);

  return (
    <>
      {data.length && (
        <div className="user">
          <img
            src={data[0].image}
            height={40}
            width={43}
            style={{ borderRadius: "50%" }}
          />
          <p style={{ margin: "6px 0px 0px 10px", fontWeight: "600" }}>
            {data[0].uName}{" "}
            {
              a==="liked"?
              <span style={{ fontWeight: "400" }}>Liked your post.</span>
              :
              <span style={{ fontWeight: "400" }}>commented on your post.</span>
            }
          </p>
        </div>
      )}
    </>
  );
};

export default Tile;
