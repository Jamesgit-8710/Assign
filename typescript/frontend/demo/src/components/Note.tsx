import React from 'react'
import '@/styles/note.css'

type props = {
    text : String
}

const Note = (props:props) => {
  return (
    <div className='note'>
        <p style={{marginTop: 8,marginLeft: 10}}>{props.text}</p>
    </div>
  )
}

export default Note