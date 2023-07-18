import React, { useEffect, useState } from 'react'
import '../styles/post.css'
import sample from '../assets/sample.png'
import heart from '../assets/heart.png'
import red from '../assets/red.png'
import comment from '../assets/comment.png'
import { getDownloadURL, ref } from 'firebase/storage'
import { db, storage } from '../firebase/user.auth'
import { FieldValue, addDoc, arrayUnion, collection, doc, getDocs, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { useSelector } from "react-redux";

const Post = ({ item, like, id, display, comm }) => {

    const state = useSelector((state) => state.users.User)

    const [data, setData] = useState([[{ image: "" }]])
    const [post, setPost] = useState([])

    useEffect(() => {

        const colRef = query(collection(db, "users"), where("id", "==", item.uploadedBy));

        onSnapshot(colRef, (snapshot) => {
            setData(snapshot.docs.map((doc) => {
                return [doc.data()]
            }))
        });

        // const colRef2 = collection(db, "posts");

        // onSnapshot(colRef2, (snapshot) => {
        //     setPost(snapshot.docs.map((doc) => {
        //         return [doc.data()]
        //     }))
        // });

        // comm.array?.forEach(element => {
        //     setCount(count+1)
        // });

    }, [])

    const liked = async () => {

        const Ref = doc(db, "posts", id);

        await updateDoc(Ref, {
            likeList: arrayUnion(state)
        });

        await addDoc(collection(db, "notifications"), {
            activity: "liked",
            postId: id,
            to: item.uploadedBy,
            by: state
        });

    }

    return (
        <div className='post'>
            <div style={{ height: 70, width: "100%" }} className='center'>
                <div style={{ height: "45px", width: "100%", backgroundColor: "white", display: "flex" }}>
                    <img src={data[0][0].image} style={{ height: "100%", width: "45px", borderRadius: "50%" }} />
                    <h3 style={{ margin: "5px 0px 0px 10px" }}>{data[0][0].uName}</h3>
                </div>
            </div>
            <div style={{ height: 350, width: "100%", backgroundColor: "rgb(244, 245, 247)", backgroundImage: `url('${item.image}')`, backgroundSize: 'contain', backgroundRepeat: "no-repeat", backgroundPosition: "center" }} className='center'>

            </div>
            <div style={{ height: 50, width: "100%" }} className='center'>
                <div style={{ height: "30px", width: "100%", backgroundColor: "white", display: "flex" }}>
                    <img src={like ? red : heart} style={{ height: "70%", marginTop: 4, cursor: "pointer" }} onClick={liked} />
                    <h5 style={{ margin: "5px 0px 0px 5px" }}>{item.likeList.length} <span>Likes</span></h5>
                    <img src={comment} style={{ height: "70%", marginTop: 4, marginLeft: 40, cursor: "pointer" }} onClick={() => {display({i: item, id: id})}}/>
                    <h5 style={{ margin: "5px 0px 0px 5px" }}>{item.comment} <span>Comments</span></h5>
                </div>
            </div>
            <div style={{ maxHeight: 68, width: "100%", fontSize: "1rem", overflow: "hidden" }}>
                {item.des}
            </div>
        </div>
    )
}

export default Post