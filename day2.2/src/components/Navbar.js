import { useState } from "react";
import '../styles/navbar.css'
import List from './List'
import Filters from './Filters'

function Navbar() {

    const [val, set] = useState("");
    const [items, setItem] = useState([]);
    //const [valF,valS] = useState([])

    const updateVal = (e) => {
        set(e.target.value)
    }

    const update = () => {
        setItem([...items,val])
    }

  const [delArr, setDelArr] = useState([]);
  const [comArr, setComArr] = useState([]);

  const setDel = (e) => {
    setDelArr([...delArr,e])
    // items.filter((item) => item!==e) 
    // items.filter((val)=> console.log(val,8888))
    // console.log(e)
    // console.log(items)
  }

  const setCom = (e) => {
    setComArr([...comArr,e])
    //console.log(comArr)
  }

  return (
    <>
    <div className="outerBody">
      <h2 className="heading">Todo List</h2>
      <div className="innerBody">
        <div className="nav">
            <input className='input' placeholder='Write Here...' onChange={updateVal}></input>
            <button onClick={update} className="btn">ADD</button>
        </div>
        <Filters delArr={delArr} comArr={comArr}/>
        <List i={items} setDel={setDel} setCom={setCom} />
      </div>
    </div>
    </>
  )
}

export default Navbar