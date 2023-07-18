import { useRef, useState } from "react";
import "../styles/home.css";
import { Input } from "antd";
import Button from "@mui/material/Button";
import Note from "../components/Note";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LockOutlined } from "@ant-design/icons";
import JoditEditor from "jodit-react";
import { addNote, updtNote } from "../slices/NoteSlice";
import { message } from "antd";

function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info("fields are empty!");
  };

  const dispatch = useDispatch();
  const note = useSelector((state) => state.notes);

  const [visiblity, setVisibility] = useState("none");
  const [vis, setVis] = useState("none");
  const [updateVis, setUpdateVis] = useState("none");

  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [more, setMore] = useState("");
  const [t, setT] = useState("");
  const [notes, setNotes] = useState([]);
  const [srch, setSrch] = useState("");
  const [oldTitle, setOldTitle] = useState("");
  const [oldDes, setOldDes] = useState("");
  const [index, setIndex] = useState(-1);

  const hide = () => {
    setContent("");
    setTitle("");
    setVisibility("none");
  };

  const add = () => {
    if (title !== "" && content !== "") {
      setVisibility("none");
      setContent("");
      setTitle("");
      dispatch(addNote({ title: title, des: content }));
    } else {
      info();
    }
  };

  const popup = () => {
    setVisibility("block");
  };

  const newContent = (e) => {
    setContent(e);
  };

  const newTitle = (e) => {
    setTitle(e.target.value);
  };

  const showMore = (e) => {
    setVis("block");
    const x = note.filter((event, index) => e === index);
    setMore(x[0].des);
    setT(x[0].title);
  };

  const exit = () => {
    setVis("none");
  };

  const search = (e) => {
    setSrch(e.target.value);
  };

  const updateShow = (e) => {
    setUpdateVis("block");
    const x = note.filter((event, index) => e === index);
    setOldTitle(x[0].title);
    setOldDes(x[0].des);
    setIndex(e);
  };

  const h = () => {
    setUpdateVis("none");
  };

  const update = () => {
    let x = note;


    const temp ={
      title: oldTitle,
      des: oldDes
    }

    dispatch(updtNote({
      newNote: temp,
      index:index
    }

    ))

    setUpdateVis("none")

  };

  return (
    <div>
      {contextHolder}
      <div className="navbar">
        <div>
          <h1 className="logo">Notes</h1>
        </div>
        <Input placeholder="Search..." className="search" onChange={search} />
        <Button variant="outlined" className="addNote" onClick={popup}>
          add Note
        </Button>
      </div>
      <div className="main">
        <div className="notes">
          {note.map((e, key) => {
            const x = e.title.toLowerCase();
            const y = e.des.toLowerCase();

            if (x.includes(srch.toLowerCase()) || y.includes(srch.toLowerCase())) {
              return (
                <Note
                  key={key}
                  title={e.title}
                  des={e.des}
                  more={showMore}
                  index={key}
                  s={updateShow}
                />
              );
            }
          })}
        </div>
      </div>

      <div className="popupBackground" style={{ display: visiblity }}>
        <div className="popupBox">
          <div className="popupTop">
            <h3 style={{ margin: 0 }}>Note</h3>
            <div className="exit" onClick={hide}></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Input
              placeholder="Title"
              className="bottom"
              value={title}
              onChange={newTitle}
            />

            <JoditEditor
              className="bottom"
              ref={editor}
              value={content}
              onChange={newContent}
            />

            <Button
              type="primary"
              onClick={add}
              style={{
                backgroundColor: "rgb(83, 143, 255)",
                color: "white",
              }}
              htmlType="submit"
              className="login-form-button bottom"
            >
              ADD
            </Button>
          </div>
        </div>
      </div>

      <div className="popupBackground" style={{ display: updateVis }}>
        <div className="popupBox">
          <div className="popupTop">
            <h3 style={{ margin: 0 }}>Note</h3>
            <div className="exit" onClick={h}></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Input
              placeholder="Title"
              className="bottom"
              onChange={(e) => setOldTitle(e.target.value)}
              value={oldTitle}
            />

            <JoditEditor
              className="bottom"
              ref={editor}
              value={oldDes}
              onChange={(e) => setOldDes(e)}
            />

            <Button
              type="primary"
              onClick={update}
              style={{
                backgroundColor: "rgb(83, 143, 255)",
                color: "white",
              }}
              htmlType="submit"
              className="login-form-button bottom"
            >
              update
            </Button>
          </div>
        </div>
      </div>

      <div className="popupBackground" style={{ display: vis }}>
        <div
          className="popupBox"
          style={{
            width: "40%",
            maxHeight: 450,
            wordBreak: "break-word",
            overflowY: "scroll",
          }}
        >
          <div className="popupTop">
            <h3 style={{ margin: 0 }}>{t}</h3>
            <div className="exit" onClick={exit}></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <div dangerouslySetInnerHTML={{ __html: more }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
