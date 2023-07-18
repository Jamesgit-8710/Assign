import React from "react";
import "../styles/temp1.css";
import phone from '../assets/phone.png'
import mail from '../assets/email.png'
import p2 from '../assets/user2.png'
import html2pdf from 'html2pdf.js';
import download from '../assets/download.png'

function TempTwo({ data, s }) {

  const x = () => {
    const element = document.getElementById('down');
    html2pdf().from(element).save(data.name + '.pdf');
  }


  return (
    <>
      {s ?
        <img src={download} onClick={(event) => { event.stopPropagation(); x(); }} height={25} style={{ backgroundColor: "rgb(0 ,0 ,0 ,0.4)", borderRadius: "10px", padding: 5, margin: "10px 0px 0px 34rem", position: "absolute", float: "right" }} />
        : null
      }    <div className="preview" id="down" >
        <div style={{ height: "100%", width: "60%", backgroundColor: "rgb(243, 248, 255)" }}>
          <div style={{ margin: 30 }}>
            <h1 style={{ marginBottom: 0 }}>{data.name}</h1>
            <p style={{ marginTop: 0 }}>{data.prof}</p>
            <div style={{ display: "flex", marginTop: 50 }}>
              <img src={phone} height={20} />
              <p style={{ margin: 0, marginLeft: 10 }}>{data.ph}</p>
            </div >
            <div style={{ display: "flex", marginTop: 10 }}>
              <img src={mail} height={20} />
              <p style={{ margin: 0, marginLeft: 10 }}>{data.gmail}</p>
            </div>
            <h2 style={{ color: "#DEC736", marginTop: 50, marginBottom: 0 }}>About</h2>
            <p style={{ wordBreak: "break-word" }}>{data.about}</p>
            <h2 style={{ color: "#DEC736", marginTop: 50, marginBottom: 0 }}>EXPERIENCE</h2>
            <h4 style={{ wordBreak: "break-word" ,marginBottom: 0}}>{data.com}</h4>
            <p style={{ margin: 0 }}>{data.ft}</p>
            <p style={{ wordBreak: "break-word", marginTop: 0 }}>{data.des}</p>
          </div>
        </div>
        <div style={{ height: "100%", width: "30%", padding: "20px 30px" }}>
          <img src={p2} height={130} style={{ padding: 5, backgroundColor: "rgb(223, 227, 233)", borderRadius: "50%" }} />
          <h2 style={{ color: "#DEC736", marginTop: 75, marginBottom: 0 }}>SKILLS</h2>
          <p style={{ marginBottom: 2 }}>{data.skills}</p>
        </div>
      </div>
    </>
  );
}

export default TempTwo;
