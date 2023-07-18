import React, { useState } from 'react'
import Player from './Player'
import List from './List'
import '../styles/main.css'
import newObj from '../store/data'

function Main() {
    
    const [index,setIn] = useState(0)

    const s = ((e) =>{
        setIn(e)
        
    })

    const ff = (()=> {
        
        if(index===newObj.length-1){
            setIn(0)
        }else{
            setIn(index+1)
        }
    })

    const bb = (()=> {
        
        if(index===0){
            setIn(newObj.length-1)
        }else{
            setIn(index-1)  
        }
    })
    
  return (
    <div className='main'>
        <Player id={index} bb={bb} ff={ff}/>
        <List set={s}/>
    </div>
  )
}

export default Main