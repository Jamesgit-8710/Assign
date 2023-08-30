import React, { useState } from 'react'
import '@/styles/addNote.css'

type props = {
  function : Function
}

const AddNote = (func:props) => {
  const [input, setInput] = useState("");

  const add = () => {
    if(input!==""){
      func.function(input);
      setInput("");
    }else
      alert("field is empty!");
  }

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  
  return (
    <div className='addNote'>
        <input type='text' value={input} placeholder='write somthing here...' style={{paddingLeft: 10}} onChange={onChange}/>
        <button onClick={add}>ADD</button>
    </div>
  )
}

export default AddNote