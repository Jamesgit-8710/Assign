import React from 'react'
import '../styles/nav.css'
import man from '../assets/man.png'
import logout from '../assets/logout.png'
import Pic from './Pic'
import { useDispatch, useSelector } from 'react-redux'
import { del } from '../slices/user.slice'
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../services/user.auth'

function Nav() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.users.User)

  const update = async () => {
    const q = query(collection(db, "users"), where("id", "==", state));

    const querySnapshot = await getDocs(q);

    let i = "";
    querySnapshot.forEach((doc) => {
      i = doc.id;
    });

    const Ref = doc(db, "users", i);

    await updateDoc(Ref, {
      status: false
    });

  }

  return (
    <div className='sideBar'>
      <div className='top center'>
        <Pic img={man} />
      </div>
      <div className='mid'>

      </div>
      <div className='bottom center' onClick={() => { update(); dispatch(del()); }}>
        <img src={logout} alt='logout' height={20} />
      </div>
    </div>
  )
}

export default Nav