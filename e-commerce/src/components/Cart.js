import React, { useEffect, useState } from "react";
import Item from "./Item";
import axios from "axios";
import { Button, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Radio } from "antd";
import { message } from "antd";
import gif from "../assets/success.gif";

const Cart = () => {
  const id = localStorage.getItem("id");
  const [data, setData] = useState([]);
  const key = "updatable";
  const [messageApi, contextHolder] = message.useMessage();

  const [amount, setAmount] = useState(0);
  const [val, setVal] = useState(0);
  const awoke = (e) => {
    setVal(e);
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [vis, setVis] = useState("none");
  const [vis2, setVis2] = useState("none");

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const handleOk = async() => {
    console.log(number);
    if (address !== "" && value !== 0) {
      if (value === 1) {
        setConfirmLoading(true);

        const res = await axios.post("http://localhost:8000/addOrder", {data: data,id: id,status: 'd',payMethod: "cod",address: address});

        const res2 = await axios.post("http://localhost:8000/clearCart", {myId: id});

        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          setAddress("");
          setValue(0);
          setNumber("");
          setVis("flex");
          setTimeout(() => {
            setVis("none");
          }, 2000);
        }, 1000);
      } else if (value === 2 && number !== "") {
        setConfirmLoading(true);

        const res = await axios.post("http://localhost:8000/addOrder", {data: data,id: id,status: 'd',payMethod: "card",address: address});

        const res2 = await axios.post("http://localhost:8000/clearCart", {myId: id});

        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
          setAddress("");
          setValue(0);
          setNumber("");
          setVis("flex");
          setTimeout(() => {
            setVis("none");
          }, 2000);
        }, 1000);
      } else {
        messageApi.open({
          key,
          type: "warning",
          content: "Enter the card number!",
          duration: 2,
        });
      }
    } else {
      messageApi.open({
        key,
        type: "warning",
        content: "feilds are empty!",
        duration: 2,
      });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setAddress("");
    setValue(0);
    setNumber("");
  };

  useEffect(() => {
    const call = async () => {
      const res = await axios.post("http://localhost:8000/cartData", {
        id: id,
      });

      setData(res.data);

      const res2 = await axios.post("http://localhost:8000/totalamount", {
        id: id,
      });
      // const res2 = await axios.post("http://localhost:8000/product", { id: res.data.});

      setAmount(res2.data.sum);

      const res3 = await axios.post("http://localhost:8000/checkExist", {
        myId: id,
      });

      if(res3.data.length!==0)
      setVis2("flex");

    };

    call();
  }, [val]);

  return (
    <div
      style={{
        height: "calc(100vh - 216px)",
        width: "50vw",
        backgroundColor: "white",
        margin: "auto",
        padding: "20px 40px 120px 40px",
        overflow: "scroll",
        borderTop: "1px solid rgb(241, 243, 245)",
      }}
      className="cart"
    >
      {contextHolder}
      <p style={{ fontSize: 25, fontWeight: 500, marginBottom: 40 }}>
        Shopping Cart
      </p>

      {data.map((i) => {
        return <Item item={i} awoke={awoke} show={true}/>;
      })}

      <div
        style={{
          width: "50vw",
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          display: vis2,
          justifyContent: "space-between",
          padding: "20px 0px",
          borderTop: "1px solid rgb(241, 243, 245)",
        }}
      >
        <p style={{ fontSize: 23, fontWeight: 500 }}>
          Total Amount: &#8377;{amount}
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setOpen(true);
          }}
        >
          Place order
        </Button>
      </div>
      <Modal
        title="Place order"
        open={open}
        // onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: "10vh" }}
        footer={[
          <Button key="back" onClick={handleCancel}>
            cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={confirmLoading}
            onClick={handleOk}
          >
            Order
          </Button>,
        ]}
      >
        <Form>
          <TextArea
            showCount
            maxLength={200}
            style={{ height: 120, marginBottom: 24 }}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Address here..."
            value={address}
          />
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1}>Cash on Delivery</Radio>
            <Radio value={2}>Credit Card</Radio>
          </Radio.Group>
        </Form>
        {value === 2 ? (
          <Input
            type="number"
            placeholder="Card number"
            style={{ marginTop: 10 }}
            onChange={(e) => {
              setNumber(e.target.value);
              console.log(typeof e.target.value);
            }}
          ></Input>
        ) : (
          ""
        )}
      </Modal>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "fixed",
          display: vis,
          top: 0,
          left: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", backgroundColor: "white", borderRadius: 10, padding: 10}}>
          <img src={gif} />
          <p style={{fontSize: 50, fontWeight: 500, marginBottom: 100}}>Done!</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
