import React, { useState, useEffect } from "react";
import { Image } from "antd";
import img from "../assets/cloud.png";
import rec from "../assets/rec.png";
import { Typography } from "antd";
import "../styles/mainBody.css";
import { f } from '../services/WhetherService'
// import axios from "axios";

// const whether =
//   "https://api.tomorrow.io/v4/timelines?location=30.7049,76.7173&fields=temperature&timesteps=1h&units=metric&apikey=pXCdNfncwqEco07ak4kN7xzVPNm0pcNs";
const { Title } = Typography;

function MainBody() {
  // const [userData, setUserData] = useState([]);

  // useEffect(() => {
  //   const getGiHubUserWithAxios = async () => {
  //       const response = await axios.get(whether);
  //       //console.log(response.data.data.timelines[0].intervals[1].startTime)
  //       const x= response.data.data.timelines[0].intervals;
  //       x.map((e)=>{
  //         console.log(e.startTime);
  //       })

  //     };

  //   getGiHubUserWithAxios();
  // }, []);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const x = async () => {
      let res = await f();
      setUserData(res.data.data.timelines[0].intervals)
      //response.data.data.timelines[0].intervals
    }

    x();
    //console.log(userData)
    //userData[0].values.temperature

  },);


  return (
    <div className="mainBody">
      <Image preview={{ visible: false }} height={250} src={img} />
      <Title className="temp" >{userData[0].values.temperature}</Title>
      <Image preview={{ visible: false }} width={40} src={rec} />
    </div>
  );
}

export default MainBody;
