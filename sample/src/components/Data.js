import React, { useState } from "react";
import axios from "axios";

const Data = () => {
  const [data, setData] = useState("");
  const [val, setVal] = useState({});
  const onFinish = async () => {
    // const us = values.username;
    // const pass = values.password;
    console.log(data);
    const res = await axios.post("http://localhost:8000/api", { city: data });
    // alert(res.data);
    // console.log(res.data.api.intervals)
    // setData(res.data.api.intervals);
    setVal(res.data);
  };

  return (
    <div>
      <input type="text" onChange={(e) => setData(e.target.value)}></input>
      <button onClick={onFinish}>BUTTON</button>

      <h1 style={{ textAlign: "center" }}>
        Weather of {val.city} and <span>Temp:{val.temp}</span>
      </h1>
    </div>
  );
};

export default Data;
