import React, { useEffect, useState } from "react";
import "../styles/chat.css";
import Child from "./Child";
import InputEmoji, { async } from "react-input-emoji";
import img from "../assets/message.png";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../services/user.auth";
import { useSelector } from "react-redux";

function Chat({ id }) {
  const [text, setText] = useState("");

  const [data, setData] = useState([]);

  const state = useSelector((state) => state.users.User);

  const roomId = [id.id, state].sort();

  const room = roomId.join("_");

  const [updt, setUpdt] = useState({});

  // console.log("id----->",id)
  // console.log("state------->",state)
  // console.log("room------->",room)

  const setStatus = (e) => {
    if (e) {
      setUpdt({ c: "#45E171", t: "online" });
    } else {
      setUpdt({ c: "red", t: "offline" });
    }
  };

  const [typng, setTypng] = useState(false);

  useEffect(() => {
    const colRef = query(
      collection(db, "chatRoom"),
      orderBy("createdAt", "asc")
    );

    onSnapshot(colRef, (snapshot) => {
      setData(
        snapshot.docs.map((doc) => {
          return [doc.data()];
        })
      );
    });

    const update = () => {
      const q = query(collection(db, "users"), where("id", "==", id.id));

      onSnapshot(q, (snapshot) => {
        snapshot.docs.map((doc) => {
          console.log(doc.data().status);
          if (doc.data().status) {
            setStatus(true);
          } else {
            setStatus(false);
          }
        });
      });
    };

    update();

    const q = query(collection(db, "users"), where("id", "==", id.id));

    onSnapshot(q, (snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(doc.data().typing);
        if (doc.data().typingFor===state && doc.data().typing===true) {
          setTypng(true);
        } else {
          setTypng(false);
        }
      });
    });


  }, []);

  // function handleOnEnter(text) {
  //   console.log("enter", text);
  // }

  const send = async () => {
    if (text !== "") {
      await addDoc(collection(db, "chatRoom"), {
        text: text,
        roomId: room,
        createdAt: serverTimestamp(),
        sId: state,
      });
      setText("");
    }
  };

  const set = async (e) => {
    setText(e);

    console.log("testing..................")

    const q = query(collection(db, "users"), where("id", "==", state));

    const querySnapshot = await getDocs(q);

    let i = "";

    querySnapshot.forEach((doc) => {
      i = doc.id;
    });

    const Ref = doc(db, "users", i);

    await updateDoc(Ref, {
      typing: true,
      typingFor: id.id,
    });

    const timerId = setTimeout(async () => {
      await updateDoc(Ref, {
        typing: false,
      });
    }, 500);

    
  };

  const clear = async () => {
    const q = query(collection(db, "chatRoom"), where("roomId", "==", room));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (d) => {
      await deleteDoc(doc(db, "chatRoom", d.id));
    });
  };

  return (
    <div className="chat">
      <div className="header">
        <h1
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {id.n}
          <p
            onClick={clear}
            style={{
              fontSize: "1rem",
              cursor: "pointer",
              color: "red",
              marginLeft: 5,
            }}
          >
            clear chat
          </p>
        </h1>
        <div className="active">
          <div
            style={{
              height: 7,
              width: 7,
              borderRadius: "50%",
              backgroundColor: updt.c,
            }}
          ></div>
          <p style={{ fontSize: 12, color: "#AAB8C2", marginLeft: 5 }}>
            {updt.t}
          </p>
          {typng?<p style={{ fontSize: 12, color: "#AAB8C2", marginLeft: 5 }}>
            typing...
          </p>:null}
        </div>
      </div>
      <div className="chats">
        {/* <Child bgColor={"#F1F6F9"} color={"#617481"} align={"left"} text={"Dummy text"}/> */}
        {data.map((item) =>
          item[0].roomId === room ? (
            state === item[0].sId ? (
              <Child
                bgColor={"#FF5151"}
                color={"white"}
                align={"right"}
                text={item[0].text}
              />
            ) : (
              <Child
                bgColor={"#F1F6F9"}
                color={"#617481"}
                align={"left"}
                text={item[0].text}
              />
            )
          ) : null
        )}
      </div>
      <div className="msgBox">
        <InputEmoji
          value={text}
          onChange={set}
          // cleanOnEnter
          onEnter={send}
          placeholder="Your message here..."
        />
        <img
          src={img}
          alt="send"
          height={40}
          style={{ marginLeft: 20, cursor: "pointer" }}
          onClick={send}
        />
      </div>
    </div>
  );
}

export default Chat;
