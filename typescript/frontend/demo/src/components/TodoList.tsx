import React from 'react'
import '@/styles/todoList.css'
import Note from './Note'

type props = {
  data : Array<String>
}

const TodoList = (data:props) => {
  return (
    <div className='todoList'>
      {
        data.data.map((item:String) => {
          return <Note text={item}/>
        })
      }
    </div>
  )
}

export default TodoList