import React, { useEffect, useState } from "react";
import {
  CalendarOutlined,
  HomeOutlined,
  ProfileOutlined,
  DropboxOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Dropdown,
  Empty,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Space,
  Switch,
  Upload,
  message,
} from "antd";
import axios from "axios";
import Product from "../components/Product";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import VendorList from "../components/VendorList";
import VenOrders from "../components/VenOrders";
import Profile from "../components/Profile";
import Drop from "../components/Drop";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../services/firbase.auth";
import AdminOrders from "../components/AdminOrders";
import VenHistory from "../components/VenHistory";
import { useDispatch } from "react-redux";
import { del } from "../services/slices/user.slice";
import img from '../assets/image.png'

function getItem(label, key, icon, click) {
  return {
    key,
    icon,
    label,
    click,
  };
}

const items = [
  getItem("Home", "1", <HomeOutlined />),
  getItem("Vendor List", "2", <ProfileOutlined />),
  getItem("Orders", "3", <DropboxOutlined />),
  getItem("Profile", "4", <UserOutlined />),
  getItem("Logout", "5", <LogoutOutlined />),
 
];

const Admin = () => {
  const [loading, setLoading] = useState(false);

  const id = localStorage.getItem("id");

  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const key = "updatable";

  const size = "large";

  const [mode, setMode] = useState("inline");
  const [theme, setTheme] = useState("dark");
  const changeMode = (value) => {
    setMode(value ? "vertical" : "inline");
  };
  const changeTheme = (value) => {
    setTheme(value ? "light" : "dark");
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [des, setDes] = useState("");
  const [cat, setCat] = useState("");
  const [data, setData] = useState([]);
  const [val, setVal] = useState(1);
  const [userData, setUserData] = useState({});
  const [files, setFiles] = useState([]);
  const [val2, setVal2] = useState("p");
  const [u, setU] = useState("");

  // const [val2, setVal2] = useState("Published");
  // const [val3, setVal3] = useState("p");

  // const onClick = ({ key }) => {
  //     if (key === "1") { setVal2("Published"); setVal3('p') }
  //     else if (key === "2") { setVal2("Draft"); setVal3('d') }
  // };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };  

  const handleOk = (e) => {
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
          images: files,
        });
        messageApi.open({
          key,
          type: "success",
          content: "Uploaded!",
          duration: 2,
        });
        setOpen(false);
        setU(e);
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

  const handleOk2 = (e) => {
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
          images: files,
        });
        messageApi.open({
          key,
          type: "success",
          content: "Uploaded!",
          duration: 2,
        });
        setOpen(false);
        setU(e)
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

      const res2 = await axios.post("http://localhost:8000/getUser", {
        id: id,
      });
      setUserData(res2.data);

    };

    getData();
  }, [u]);

  const setKey = (e) => {
    setVal(Number(e));
  };

  const out = () => {
    localStorage.removeItem("id");
    dispatch(del());
  }

  const f = val2==='p'?data.filter((i) => i.status === "p" && val2 === "p"):data.filter((i) => i.uploadedBy === id && i.status === val2)

  return (
    <div>
      {contextHolder}
      <div style={{ display: "flex" }}>
        <Menu
          style={{
            width: 256,
            height: "100vh",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode={mode}
          theme={theme}
          items={items}
          onClick={(e) => {
            setKey(e.key);
          }}
        />
        {/* <Switch onChange={changeTheme} /> {theme} */}
        <div style={{ height: "100vh", width: "calc(100vw - 256px)" }}>
          <div style={{ padding: "10px 20px" }}>
            <h2
              style={{
                paddingBottom: 10,
                borderBottom: "1px solid black",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              Admin Panel
              <div style={{ display: "flex" }}>
                {/* <Dropdown menu={{ i, onClick }}>
                                <Button style={{ marginTop: 5, marginRight: 30 }}>
                                    <Space>
                                        {val2}
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown> */}
                {val === 1 ? <Drop sent={setVal2} /> : ""}
                {val === 3 ? <p
                  style={{
                    fontSize: 18,
                    fontWeight: 400,
                    marginTop: 5,
                    marginRight: 60,
                    cursor: "pointer",
                  }}
                  onClick={() => {setVal(6)}}
                >
                  Order history
                </p> : ""}
                <Button
                  style={{ marginTop: 5 }}
                  type="primary"
                  onClick={() => {
                    showModal();
                  }}
                  ghost
                >
                  {" "}
                  Add Product{" "}
                </Button>
              </div>
            </h2>
          </div>

          {val === 2 ? (
            <VendorList />
          ) : val === 3 ? (
            <AdminOrders />
          ) : val === 4 ? (
            <Profile userData={userData} />
          ) : val === 5 ? out()
          : val === 6 ? 
          <VenHistory orderVis={true}/> 
          : (
            <div
              className="cart"
              style={{
                height: "calc(100vh - 68px)",
                width: "calc(100vw - 256px)",
                display: "flex",
                flexWrap: "wrap",
                overflow: "scroll",
              }}
            >
              {f.length===0?<div style={{height: "30%",width: "100%",backgroundColor: "white",paddingTop: 200,margin: "auto"}}><Empty description='No Product'/></div>:
              data.map((i, index) => {
                if (i.status === "p" && val2 === "p")
                  return <Product item={i} show={false} d={setU}/>;
                else if (i.uploadedBy === id && i.status === val2)
                  return <Product item={i} show={false} d={setU}/>;
              })}
            </div>
          )}

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
                rules={[
                  { required: true, message: "Please input product name!" },
                ]}
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
                rules={[
                  { required: true, message: "Please input product price!" },
                ]}
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
                rules={[
                  { required: true, message: "Please select the category!" },
                ]}
              >
                <Select
                  placeholder="Category"
                  onChange={(e) => {
                    setCat(e);
                  }}
                >
                  <Select.Option value="Cloths">Cloths</Select.Option>
                  <Select.Option value="Electronics">Electronics</Select.Option>
                  <Select.Option value="Shoes">Shoes</Select.Option>
                  <Select.Option value="Accessories">Accessories</Select.Option>
                  <Select.Option value="Furniture">Furniture</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="des"
                rules={[
                  { required: true, message: "Please input description!" },
                ]}
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
                  <div
                  style={{ height: 110, width: 110, backgroundColor: "rgb(241, 243, 245)",border: "1px dashed rgb(200, 200, 200)",borderRadius: 10,backgroundImage: `url(${img})`,backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}
                  >
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
      </div>
    </div>
  );
};

export default Admin;
