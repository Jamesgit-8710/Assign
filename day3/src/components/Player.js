import React, { useState } from 'react'
import '../styles/player.css'
import newObj from '../store/data'

function Player({id,bb,ff}) {

    const play="fa-solid fa-play"
    const pause="fa-solid fa-pause"

    const [icon,setIcon] = useState("fa-solid fa-play")

    const click = (()=>{
        if(icon==="fa-solid fa-play"){
            setIcon(pause)
        }else{
            setIcon(play)
        }
    })

    const f = (()=> {
        ff()
    })

    const b = (()=> {
        bb()
    })

  return (
    <div className='player'>
        <img src={newObj[id].imgurl} className='playerImg' alt="img"/>
        <h3 className='songName'>{newObj[id].title}</h3>
        <div className='outerDiv'>
            <div className='innerDiv'></div>
        </div>
        <div className='play'>
            <i class="fa-solid fa-backward" onClick={b}/>
            <i class={icon} onClick={click}/>
            <i class="fa-solid fa-forward" onClick={f}/>
        </div>
    </div>
  )
}

export default Player