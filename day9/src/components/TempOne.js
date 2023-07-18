import React from "react";
import "../styles/temp1.css";
import phone from '../assets/phone2.png'
import mail from '../assets/email2.png'
import html2pdf from 'html2pdf.js';
import download from '../assets/download.png'

function TempOne({ data, s }) {

  const x = () => {
    const element = document.getElementById('down');
    html2pdf().from(element).save(data.name + '.pdf');
  }


  return (
    <>
      {s ?
        <img src={download} onClick={(event) => { event.stopPropagation(); x(); }} height={25} style={{ backgroundColor: "rgb(0 ,0 ,0 ,0.4)", borderRadius: "10px", padding: 5, margin: "10px 0px 0px 34rem", position: "absolute", float: "right" }} />
        : null
      }

      <div className="preview" id="down" >
        <div
          style={{
            padding: "20px",
            height: "calc(30% - 20px)",
            width: "calc(40% - 20px)",
            backgroundColor: "rgb(219, 194, 198)",
          }}
        >
          <h1 style={{ margin: 0 }}>{data.name}</h1>
          <p style={{ marginTop: 0 }}>{data.prof}</p>
          <div style={{ display: "flex", marginTop: 20 }}>
            <img src={phone} height={20} />
            <p style={{ margin: 0, marginLeft: 10 }}>{data.ph}</p>
          </div >
          <div style={{ display: "flex", marginTop: 10 }}>
            <img src={mail} height={20} />
            <p style={{ margin: 0, marginLeft: 10 }}>{data.gmail}</p>
          </div>
        </div>
        <div
          style={{
            padding: "20px",
            height: "calc(30% - 20px)",
            width: "calc(60% - 60px)",
            backgroundColor: "rgb(253, 248, 249)",
          }}
        >
          <h3>About</h3>
          <p style={{ wordBreak: "break-word" }}>{data.about}</p>
        </div>
        <div
          style={{
            padding: "20px",
            height: "calc(70% - 20px)",
            width: "calc(40% - 20px)",
            backgroundColor: "rgb(233, 223, 224)",
          }}
        >
          <h3>Skills</h3>
          <p style={{ wordBreak: "break-word" }}>{data.skills}</p>
        </div>
        <div
          style={{
            padding: "20px",
            height: "calc(70% - 20px)",
            width: "calc(60% - 60px)",
            backgroundColor: "rgb(255, 253, 253)",
          }}
        >
          <h3>Work experience</h3>
          <h4 style={{ wordBreak: "break-word", marginBottom: 0}}>{data.com}</h4>
          <p style={{margin: 0}}>{data.ft}</p>
          <p style={{marginTop: 0}}>{data.des}</p>
        </div>
      </div>
    </>
  );
}

export default TempOne;
