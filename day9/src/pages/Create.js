import React, { useEffect, useState } from "react";
import "../styles/create.css";
import eye from "../assets/eye.png";
import reset from "../assets/reset.png";
import { Input } from "antd";
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.png";
import TempOne from "../components/TempOne";
import close from "../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { addResume, updtResume } from "../slices/resume/resume.slice";
import TempTwo from "../components/TempTwo";
import TempThird from "../components/TempThird";
import { useLocation, useNavigate } from "react-router";
import { message } from 'antd';

function Create() {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info('fields are empty');
  };


  const location = useLocation();
  const d = location.state;

  const state = useSelector((state) => state.resumes);
  const state2 = useSelector((state) => state.otp);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [prof, setProf] = useState("");
  const [about, setAbout] = useState("");
  const [gmail, setGmail] = useState("");
  const [ph, setPh] = useState("");
  const [skills, setSkills] = useState("");
  const [com, setCom] = useState("");
  const [ft, setFt] = useState("");
  const [des, setDes] = useState("");
  const [vis, setVis] = useState("none");
  const [val, setVal] = useState(0);

  const empty = () => {
    setAbout("");
    setCom("");
    setDes("");
    setFt("");
    setGmail("");
    setName("");
    setPh("");
    setProf("");
    setSkills("");
  };

  const set = () => {
    if (d !== null) {
      const x = state[d.myInd].data[d.ind]
      setAbout(x.about);
      setCom(x.com);
      setDes(x.des);
      setFt(x.ft);
      setGmail(x.gmail);
      setName(x.name);
      setPh(x.ph);
      setProf(x.prof);
      setSkills(x.skills);
      setVal(x.id)
    }
  }

  useEffect(() => {
    set();
  }, [])

  const data = {
    name: name,
    prof: prof,
    about: about,
    gmail: gmail,
    ph: ph,
    skills: skills,
    com: com,
    ft: ft,
    des: des,
    id: val,
    status: true
  };

  const submit = () => {
    if (name !== "" && prof !== "" && about !== "" && gmail !== "" && ph !== "" && skills !== "" && com !== "" && ft !== "" && des !== "") {
      const a = state2.data;

      let i;

      const x = state.map((e, index) => {
        if (a === e.id) i = index;
      });

      if (d === null) {

        const s = {
          i: i,
          d: data,
        };

        dispatch(addResume(s));
      } else {

        const s = {
          i: i,
          di: d.ind,
          d: {
            name: name,
            prof: prof,
            about: about,
            gmail: gmail,
            ph: ph,
            skills: skills,
            com: com,
            ft: ft,
            des: des,
            id: val,
            status: true
          },
        };

        dispatch(updtResume(s));

      }

      navigate('/', { replace: true })
    } else {
      info();
    }
  };

  const draft = () => {

    const a = state2.data;

    let i;

    const x = state.map((e, index) => {
      if (a === e.id) i = index;
    });


    if (d === null) {

      const s = {
        i: i,
        d: {
          name: name,
          prof: prof,
          about: about,
          gmail: gmail,
          ph: ph,
          skills: skills,
          com: com,
          ft: ft,
          des: des,
          id: val,
          status: false
        },
      };

      dispatch(addResume(s));
    } else {
      const s = {
        i: i,
        di: d.ind,
        d: {
          name: name,
          prof: prof,
          about: about,
          gmail: gmail,
          ph: ph,
          skills: skills,
          com: com,
          ft: ft,
          des: des,
          id: val,
          status: false
        },
      };

      dispatch(updtResume(s));
    }

    navigate('/', { replace: true })

  }

  return (
    <div className="create">
      {contextHolder}
      <div className="header">
        <h2 className="res">
          Resume<span className="build">Builder</span>
        </h2>
        {
          d === null ?
            <h3 style={{ color: "white", margin: "7px" }}>New document</h3> :
            <h3 style={{ color: "white", margin: "7px" }}>Draft</h3>
        }
        <div className="actions">
          <img
            onClick={() => setVis("flex")}
            src={eye}
            className="rightSpace"
            style={{ marginTop: 4, cursor: "pointer" }}
            height={28}
          />
          <img
            onClick={empty}
            src={reset}
            style={{ marginTop: 8, cursor: "pointer" }}
            className="rightSpace"
            height={20}
          />
          <h3
            style={{
              marginTop: 4,
              color: "white",
              border: "1px solid white",
              padding: "0px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            className="rightSpace submit"
            onClick={draft}
          >
            Save
          </h3>
          <h3
            style={{
              marginTop: 4,
              color: "white",
              border: "1px solid white",
              padding: "0px 15px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            className="rightSpace submit"
            onClick={submit}
          >
            SUBMIT
          </h3>
        </div>
      </div>
      <div className="main">
        <div className="left">
          <img className={`${val === 0 ? 'selected' : ''}`}
            src={s1}
            onClick={() => setVal(0)}
            style={{ margin: "10px 0px" }}
            width={270}
          />
          <img className={`${val === 1 ? 'selected' : ''}`}
            src={s2}
            onClick={() => setVal(1)}
            style={{ margin: "10px 0px" }}
            width={270}
          />
          <img className={`${val === 2 ? 'selected' : ''}`}
            src={s3}
            onClick={() => setVal(2)}
            style={{ margin: "10px 0px" }}
            width={270}
          />
        </div>
        <div className="right">
          <div className="resume">
            <h3>Personal details</h3>
            <Input
              className="margin"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              className="margin"
              value={prof}
              placeholder="Profession"
              onChange={(e) => setProf(e.target.value)}
            />
            <Input
              className="margin"
              value={about}
              placeholder="About"
              onChange={(e) => setAbout(e.target.value)}
            />
            <Input
              className="margin"
              value={gmail}
              placeholder="Gmail"
              onChange={(e) => setGmail(e.target.value)}
            />
            <Input
              className="margin"
              value={ph}
              placeholder="Phone number"
              onChange={(e) => setPh(e.target.value)}
            />
            <Input
              className="margin"
              value={skills}
              placeholder="Skills"
              onChange={(e) => setSkills(e.target.value)}
            />
            <h3>Work experience</h3>
            <Input
              className="margin"
              value={com}
              placeholder="Company"
              onChange={(e) => setCom(e.target.value)}
            />
            <Input
              className="margin"
              value={ft}
              placeholder="From - To"
              onChange={(e) => setFt(e.target.value)}
            />
            <Input
              className="margin"
              value={des}
              placeholder="Description"
              onChange={(e) => setDes(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="popupBack" style={{ display: vis }}>
        <img
          onClick={() => setVis("none")}
          src={close}
          height={20}
          style={{ position: "fixed", top: "20px", right: "30px" }}
        />

        {val === 0 && <TempOne data={data} s={false} />}
        {val === 1 && <TempTwo data={data} s={false} />}
        {val === 2 && <TempThird data={data} s={false} />}

      </div>
    </div>
  );
}

export default Create;
