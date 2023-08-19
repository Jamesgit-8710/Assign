import React, { useState } from "react";
import "../styles/main.css";
import AddNote from "../components/AddNote";
import TodoList from "../components/TodoList";


const Main = () => {
  const [data, setData] = useState<Array<String>>([])

  const addNewNote = (event:String) => {
    setData([...data , event]);
  }

  return (
    <div className="main">
      <div className="innerContainer">
        <AddNote function={addNewNote}/>
        <TodoList data={data}/>
      </div>
    </div>
  );
};

export default Main;
