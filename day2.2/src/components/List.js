//import { useState } from 'react'
import React from 'react'
import Item from './Item';

function List({i,setDel,setCom}) {

  // const [delArr, setDelArr] = useState([]);
  // const [comArr, setComArr] = useState([]);
  //const [f, setF] = useState('');
  //const [arr,setArr] = useState(i)

  

  const setDelArr = (e) => {
    setDel(e)
    //setF(e)


    // const filteredArray = i.filter((item) =>
    // item!==e
    // );
    // setArr(filteredArray)



    // i=i.filter((item) => item!==e)
    // i.filter((val)=> console.log(val,8888))
    // console.log(e,99)
  }

  const setComArr = (e) => {
    setCom(e)
  }

  // const setf = (e) => {
  //   set(e)
  // }
    
  return (
    <div>
        {i.map((e) => {
          return <Item title={e} setDel={setDelArr} setCom={setComArr} />
        })}
    </div>
  )
}

export default List