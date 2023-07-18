import React from "react";
import "../styles/item.css"

function Item({title,setDel,setCom}) {

  // const [val, set] = useState("");

  // const updateVal = (e) => {
    
  // }

  // const [delArr, setDel] = useState([]);
  // const [comArr, setCom] = useState([]);

  const deletedArr = () => {
    setDel(title)
    //set(title)
    //console.log(title)
  }

  const completedArr = () => {
    setCom(title)
    //console.log(title)
  }

  return (
    <div className="todo">
      <p className="title">{title}</p>
      <button className="com" onClick={completedArr}>completed</button>
      <button className="del" onClick={deletedArr}>deleted</button>
    </div>
  )
}

export default Item