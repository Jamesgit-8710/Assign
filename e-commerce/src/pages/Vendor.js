import React, { useEffect, useState } from "react";
import "../styles/vendor.css";
import { Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Upload, message } from "antd";
import axios from "axios";
import Product from "../components/Product";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../services/firbase.auth";
import VenOrders from "../components/VenOrders";
import VenHistory from "../components/VenHistory";

const Vendor = () => {
  const [loading, setLoading] = useState(false);

  const id = localStorage.getItem("id");

  const [messageApi, contextHolder] = message.useMessage();

  const key = "updatable";

  const size = "large";



  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [des, setDes] = useState("");
  const [cat, setCat] = useState("");
  const [data, setData] = useState([]);
  const [files, setFiles] = useState([]);
  const [val3, setVal3] = useState(0);

  const { TextArea } = Input;

  const [val, setVal] = useState("Published");
  const [val2, setVal2] = useState("p");

  const onClick = ({ key }) => {
    if (key === "1") {
      setVal("Published");
      setVal2("p");
    } else if (key === "2") {
      setVal("Draft");
      setVal2("d");
    }
  };

  const items = [
    {
      label: "Published",
      key: "1",
    },
    {
      label: "Draft",
      key: "2",
    },
  ];

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    if (name !== "" && price !== "" && qty !== "" && des !== "" && cat !== "") {
      if (files.length === 4) {
        const res = axios.post("http://localhost:8000/addProduct", {
          name: name,
          price: price,
          qty: qty,
          des: des,
          cat: cat,
          uploadedBy: id,
          status: "p",
          images: files
        });
        messageApi.open({
          key,
          type: "success",
          content: "Uploaded!",
          duration: 2,
        });
        setOpen(false);
      } else {
        messageApi.open({
          key,
          type: "warning",
          content: "Select at least 4 images!",
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

    // setConfirmLoading(true);
    // setTimeout(() => {
    //   setOpen(false);
    //   setConfirmLoading(false);
    // }, 2000);
  };

  const handleOk2 = () => {
    if (name !== "" && price !== "" && qty !== "" && des !== "" && cat !== "") {
      if (files.length === 4) {
        const res = axios.post("http://localhost:8000/addProduct", {
          name: name,
          price: price,
          qty: qty,
          des: des,
          cat: cat,
          uploadedBy: id,
          status: "d",
          images: files
        });
        messageApi.open({
          key,
          type: "success",
          content: "Uploaded!",
          duration: 2,
        });
        setOpen(false);
      } else {
        messageApi.open({
          key,
          type: "warning",
          content: "Select at least 4 images!",
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
  };

  const call = () => {
    console.log("first");
  };

  const set = async (event) => {
    if (event.target.value !== "") {
      const f = event.target.files[0];

      messageApi.open({
        key,
        type: "loading",
        content: "Loading...",
        duration: 2,
      });

      const imgName = id + Date().toString();

      const storageRef = ref(storage, "images/" + imgName);

      await uploadBytes(storageRef, f).then((snapshot) => {
        console.log("Uploaded");
      });

      let imgUrl = "";

      await getDownloadURL(ref(storage, "images/" + imgName))
        .then((url) => {
          imgUrl = url;
        })
        .catch((error) => {
          alert(error);
        });

      setFiles([...files, imgUrl]);

      messageApi.open({
        key,
        type: "success",
        content: "Done!",
        duration: 2,
      });

    }
  };

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("http://localhost:8000/getProduct");
      setData(res.data);
    };

    getData();
  }, []);

  return (
    <div className="vendorBackground">
      {contextHolder}
      <div
        style={{
          backgroundColor: "#000a30",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ color: "white", fontWeight: 500 }}>Vendor Panel</h2>
        <Dropdown menu={{ items, onClick }}>
          <Button style={{ marginTop: 4 }}>
            <Space>
              {val}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <div style={{ display: "flex", color: "white" }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 400,
              marginTop: 5,
              marginRight: 60,
              cursor: "pointer",
            }}
            onClick={() => { setVal3(0) }}
          >
            Home
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 400,
              marginTop: 5,
              marginRight: 60,
              cursor: "pointer",
            }}
            onClick={() => { setVal3(1) }}
          >
            Orders
          </p>
          <p
            style={{
              fontSize: 18,
              fontWeight: 400,
              marginTop: 5,
              marginRight: 60,
              cursor: "pointer",
            }}
            onClick={() => { setVal3(2) }}
          >
            History
          </p>
          <Button
            size={size}
            style={{
              backgroundColor: "#000a30",
              border: "1px solid white",
              color: "white",
            }}
            onClick={showModal}
          >
            Add Product
          </Button>
        </div>
      </div>


      {
        val3 === 1 ?
          <VenOrders />
          : val3 === 2 ?
            <VenHistory />
            :
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                backgroundColor: "rgb(241, 243, 245)",
              }}
            >
              {data.map((i, index) => {
                if (i.uploadedBy === id && i.status === val2)
                  return <Product item={i} show={false} />;
              })}
            </div>


      }

      <Modal
        title="Add Product"
        open={open}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: "10vh" }}
        footer={[
          <Button key="back" onClick={handleOk2}>
            Save as Draft
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Add item
          </Button>,
        ]}
      >
        <Form onFinish={call}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input
              placeholder="Product name"
              style={{ marginTop: 20 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <Input
              placeholder="Price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="qty"
            rules={[{ required: true, message: "Please input quantity!" }]}
          >
            <Input
              placeholder="Qty"
              type="number"
              onChange={(e) => setQty(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="cat"
            rules={[{ required: true, message: "Please select the category!" }]}
          >
            <Select
              placeholder="Category"
              onChange={(e) => {
                setCat(e);
              }}
            >
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="demo2">df</Select.Option>
              <Select.Option value="demo3">Dfasemo</Select.Option>
              <Select.Option value="demo4">Demfasfo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="des"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea
              rows={4}
              placeholder="Description"
              onChange={(e) => setDes(e.target.value)}
            />
          </Form.Item>
          <div style={{ display: "flex" }}>
            {files.map((i) => {
              return (
                <img
                  src={i}
                  height={100}
                  width={100}
                  style={{
                    border: "1px solid gray",
                    padding: 5,
                    borderRadius: 5,
                  }}
                />
              );
            })}

            {files.length !== 4 ? (
              <div style={{ height: 100, width: 100, backgroundColor: "grey" }}>
                <input
                  type="file"
                  onChange={set}
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "grey",
                    opacity: 0,
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Vendor;
