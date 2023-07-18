import React from 'react'
import Song from './Song'
import '../styles/list.css'
import obj from '../store/data'

function List({set}) {
   
    const setIn = ((e)=>{
        set(e)
    })

  return (
    <div className='list'>
        {obj.map((e,index)=>{
            return <Song imgUrl={e.imgurl} title={e.title} sr={e.src} setIndex={setIn} index={index}/>
        })}
    </div>
  )
}

export default List