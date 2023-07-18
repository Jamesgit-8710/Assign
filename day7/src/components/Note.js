import React from "react";
import "../styles/note.css";
import { Card } from "antd";
import edit from "../assets/edit.png";
import dlt from "../assets/delete.png";
import { useDispatch } from "react-redux";
import { rmvNote } from "../slices/NoteSlice";

function Note({ title, des, more, index, s }) {
  const dispatch = useDispatch();

  const show = () => {
    more(index);
  };

  const update = () => {
    s(index);
  };

  const rmv = (e) => {
    console.log(e)
    dispatch(rmvNote(e));
  };

  return (
    <Card
      className="card"
      title={
        <p>
          {title}
          <img
            onClick={update}
            src={edit}
            height={20}
            style={{ marginLeft: 10, cursor: "pointer" }}
          />
          <img
            src={dlt}
            onClick={()=>{rmv(index)}}
            height={20}
            style={{ marginLeft: 10, cursor: "pointer" }}
          />
        </p>
      }
      extra={
        <p
          onClick={show}
          style={{ color: "rgb(83, 143, 255)", cursor: "pointer" }}
        >
          more
        </p>
      }
      style={{
        height: 280,
        width: 300,
        wordWrap: "break-word",
        overflow: "hidden",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: des }} />
    </Card>
  );
}

export default Note;
