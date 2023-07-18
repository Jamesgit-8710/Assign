import React, { useEffect, useState } from "react";
import IncDecCounter from "./IncDecCounter";
import { Button, message } from "antd";
import img from "../assets/iphone.jpg";
import axios from "axios";
import { Steps } from "antd";
import img1 from "../assets/prepare.gif";
import img2 from "../assets/dispatched.gif";
import img3 from "../assets/ontheway.webp";
import img5 from "../assets/delivered.gif";

const Item = ({ item, awoke, show }) => {
  const id = localStorage.getItem("id");

  const [data, setData] = useState([{ price: 0, images: [] }]);

  const [val, setVal] = useState(1);
  const [vis, setVis] = useState("none");
  const [t, setT] = useState(-1);

  const [messageApi, contextHolder] = message.useMessage();

  const key = "updatable";

  const rmv = async () => {
    const res = await axios.post("http://localhost:8000/deleteItem", {
      id: id,
      itemId: item.itemId,
    });

    messageApi.open({
      key,
      type: "success",
      content: "Removed!",
      duration: 2,
    });
  };

  const cancel = async () => {
    const res = await axios.post("http://localhost:8000/updateOrder", {
      id: item._id,
      data: "c",
    });
  };

  const track = async () => {
    setVis("flex");
    const res = await axios.post("http://localhost:8000/getTrack", {
      id: item._id,
    });
    console.log(res.data);
    setT(res.data);
  };

  useEffect(() => {
    const call = async () => {
      const res = await axios.post("http://localhost:8000/product", {
        id: item.itemId,
      });

      setData(res.data);
    };

    call();
  }, []);

  return (
    <>
      <div
        style={{
          width: "calc(100% - 40px)",
          padding: 20,
          borderRadius: 10,
          border: "1px solid rgb(241, 243, 245)",
          marginTop: 10,
        }}
      >
        {contextHolder}
        <div style={{ display: "flex" }}>
          <div
            style={{
              height: 150,
              width: 130,
              backgroundImage: `url('${data[0].images[0]}')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div style={{ marginLeft: 20 }}>
            <p style={{ fontSize: 20 }}>{data[0]?.productName}</p>
            <p style={{ color: "rgb(180, 180, 180)" }}>{data[0]?.des}</p>
            <p style={{ fontWeight: 500, fontSize: 20, marginTop: 10 }}>
              &#8377;{data[0]?.price}
            </p>
            {!show ? <h5>{item.count} Pcs</h5> : ""}
            <div style={{ display: show ? "flex" : "none" }}>
              <IncDecCounter
                n={item.count}
                qty={data[0]?.qty}
                set={setVal}
                itemId={item.itemId}
                awoke={awoke}
              />
              <Button
                type="primary"
                style={{ marginTop: 32, marginLeft: 40 }}
                onClick={rmv}
                danger
                ghost
              >
                Remove
              </Button>
            </div>
            <div style={{ display: show ? "none" : "flex" }}>
              {item.status === "d" ? (
                <>
                  <Button
                    type="primary"
                    style={{ marginTop: 32, width: 150 }}
                    onClick={cancel}
                    danger
                    ghost
                  >
                    Cancel order
                  </Button>
                  <Button
                    type="primary"
                    style={{ width: 150, marginTop: 32, marginLeft: 40 }}
                    onClick={track}
                    ghost
                  >
                    Track order
                  </Button>
                </>
              ) : item.status === "c" ? (
                <p
                  style={{
                    color: "red",
                    borderRadius: 5,
                    marginTop: 20,
                    fontSize: 20,
                  }}
                >
                  Canceled
                </p>
              ) : (
                <p
                  style={{
                    color: "rgb(93, 109, 255)",
                    borderRadius: 5,
                    marginTop: 20,
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={track}
                >
                  Delivered
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgb(241, 243, 245)",
            marginTop: 15,
          }}
        >
          <p style={{ fontWeight: 500, fontSize: 20, marginTop: 10 }}>Amount</p>
          <p style={{ fontWeight: 500, fontSize: 20, marginTop: 10 }}>
            &#8377;{data[0]?.price * val}
          </p>
        </div>
      </div>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.4)",
          top: 0,
          left: 0,
          display: vis,
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          setVis("none");
        }}
      >
        <div
          style={{
            width: "50%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 30,
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Steps
            size="small"
            current={t - 1}
            items={[
              {
                title: "Preparing",
              },
              {
                title: "dispatched",
              },
              {
                title: "On the way",
              },
              {
                title: "Arrive today",
              },
              {
                title: "Delivered",
              },
            ]}
          />
          <div
            style={{
              height: "20rem",
              width: "50%",
              backgroundColor: "white",
              margin: "10px auto",
              backgroundImage: `url(${
                t === 1
                  ? img1
                  : t === 2
                  ? img2
                  : t === 3
                  ? img3
                  : t === 5
                  ? img5
                  : ""
              })`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"

            }}
          >
            {t===4?<p style={{fontSize: 80,border: "1px solid black",borderRadius: 10,padding:20,textAlign: "center"}}>Today!</p>:""}
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
