import React, { useState } from "react";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { addResume, rmv } from "../slices/resume/resume.slice";
import { useNavigate } from "react-router";
import TempOne from "../components/TempOne";
import TempTwo from "../components/TempTwo";
import TempThird from "../components/TempThird";
import close from "../assets/close.png";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.png";
import exit from '../assets/exit.png';
import dlt from '../assets/delete.png'
import { logout } from "../slices/user/otp.slice";
import { verify } from "../slices/user/user.slice";
import html2pdf from 'html2pdf.js';
import edit from '../assets/edit.png'

function Home() {
  const state = useSelector((state) => state.resumes);
  const state2 = useSelector((state2) => state2.otp.data);
  const [vis, setVis] = useState("none");
  const [cardVis, setCardVis] = useState("none");
  const [val, setVal] = useState(-1);
  const [val2, setVal2] = useState();
  const [img, setImg] = useState();
  const arr = [s1, s2, s3];

  let i;

  state.map((e, index) => {
    if (state2 === e.id)
      i = index;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const send = () => {
    navigate("/create");
  };

  const send2 = (e) => {
    navigate("/create", { state: { myInd: i, ind: e } });
  };

  const set = (e) => {
    setVal(e)
    setVis("flex")
    // console.log(e)
  }

  const set2 = (e) => {
    setVal2(e)
  }

  const call = () => {
    dispatch(logout())
    navigate('/', { replace: true })
    dispatch(verify("login"))
  }


  return (
    <div>
      <div className="header">
        <h2 className="res">
          Resume<span className="build">Builder</span>
        </h2>
        <h3 style={{ color: "white", margin: "6px 30px 0px 0px", cursor: "pointer" }} onClick={call}>LOG.OUT.</h3>
      </div>
      <div className="list">
        {state[i].data.map((e, index) => {
          return <div className="card" style={{ backgroundImage: `url(${arr[e.id]})`, backgroundSize: "cover" }} key={index} onClick={() => { set(e.id); set2(index); }}>
            {e.status ?
              <img src={dlt} onClick={(event) => { event.stopPropagation(); const x = { ind: index, myInd: i }; dispatch(rmv(x)); }} height={20} style={{ backgroundColor: "rgb(0 ,0 ,0 ,0.4)", borderRadius: "10px", padding: 5, float: "right", margin: "10px 10px 0 0" }} />
              :
              <img src={edit} onClick={(event) => { event.stopPropagation(); send2(index) }} height={20} style={{ backgroundColor: "rgb(0 ,0 ,0 ,0.4)", borderRadius: "10px", padding: 5, float: "right", margin: "10px 10px 0 0" }} />
            }
          </div>;
        })}
      </div>
      <div className="float-btn" onClick={send}></div>

      <div className="popupBack" style={{ display: vis }}>
        <img
          onClick={() => { setVis("none"); setVal(-1) }}
          src={close}
          height={20}
          style={{ position: "fixed", top: "20px", right: "30px" }}
        />

        {val === 0 && <TempOne data={state[i].data[val2]} s={true} />}
        {val === 1 && <TempTwo data={state[i].data[val2]} s={true} />}
        {val === 2 && <TempThird data={state[i].data[val2]} s={true} />}

      </div>
    </div>
  );
}

export default Home;
