import React, { useState } from "react";
import "../styles/details.css";
import axios from "axios";

const Details = () => {

const [data, setData] = useState("No Data!");

  const getDetails = async () => {
    const res = await axios.get("http://localhost:8001/details");

    setData(res.data);
  };

  return (
    <div className="details">
      <div className="innerDiv">
        <h3 className="heading">
          Details
          <button
            onClick={() => {
              getDetails();
            }}
          >
            Referesh
          </button>
        </h3>
        <div>
            <p><b>from :</b> {data.from}</p>
            <p><b>to :</b> {data.to}</p>
            <p><b>date :</b> {data.date}</p>
            <p><b>name :</b> {data.name}</p>
            <p><b>age :</b> {data.age}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
