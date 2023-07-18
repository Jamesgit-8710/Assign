import { useState, useEffect } from "react";
import "../styles/home.css";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import user from "../assets/user.png";
import password from "../assets/password.png";
import admin from "../assets/admin.png";
import Item from "../components/Item";
import empty from "../assets/empty.png";
import customer from "../assets/customer.png";
import { message } from "antd";
import axios from 'axios';

function Home() {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info("Added to cart");
  };

  const [visiblity, setVis] = useState("none");
  const [profileVis, setProVis] = useState("none");
  const [cart, setCart] = useState("");
  const [add, setAdd] = useState("");
  const [item, setItem] = useState("none");
  const [itemTitle, setitemTitle] = useState("");
  const [itemPrice, setitemPrice] = useState("");
  const [img, setImg] = useState(admin);
  const [showcart, setShowCart] = useState("none");

  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [prof, setProf] = useState("");
  const [index, setIndex] = useState(-1);
  // const [data, setData] = useState([])
  const [updatedUN, setUpdatedUn] = useState("");
  const [updatedPass, setUpdatedPass] = useState("");
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    const x = JSON.parse(localStorage.getItem("currUser"));
    const y = JSON.parse(localStorage.getItem("users"));
    const z = JSON.parse(localStorage.getItem("items"));

    const res = axios.post('http://localhost:8000/fetch');

    console.log(res)

    if (z !== null) {
      setItems([...z]);
    }

    const u = y[x].u;
    const p = y[x].p;
    const prof = y[x].prof;

    // setData(y)
    setName(u);
    setPass(p);
    setIndex(x);

    if (prof === "e") {
      setProf("user");
      setAdd("none");
      setCart("block");
      setImg(customer);
    } else {
      setProf("Admin");
      setAdd("block");
      setCart("none");
    }

    
  },[]);

  // const vis = () => {
  //   setVis("block")
  // }

  const itemVis = () => {
    setItem("block");
  };

  const itemHide = () => {
    setItem("none");
  };

  const hide = () => {
    setVis("none");
  };

  const onAvater = () => {
    setProVis("block");
  };

  const out = () => {
    setProVis("none");
  };

  const callFunctions = () => {
    setVis("block");
    setProVis("none");
  };

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("currUser");
    navigate("/login", { replace: true });
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const updateUN = (e) => {
    setUpdatedUn(e.target.value);
  };

  const updatePass = (e) => {
    setUpdatedPass(e.target.value);
  };

  const title = (e) => {
    setitemTitle(e.target.value);
  };

  const price = (e) => {
    setitemPrice(e.target.value);
  };

  const update = () => {
    if (updatedUN !== "" && updatedPass !== "") {
      let x = JSON.parse(localStorage.getItem("users"));
      x[index].u = updatedUN;
      x[index].p = updatedPass;
      localStorage.setItem("users", JSON.stringify(x));
      let y = JSON.parse(localStorage.getItem(name));

      if (y !== null) {
        localStorage.removeItem(name);
        localStorage.setItem(updatedUN, JSON.stringify(y));
      }

      hide();
    }
  };

  // Important

  // useEffect(() => {
  //   const x = JSON.parse(localStorage.getItem("items"));
  //   console.log(x)
  //   if (x !== null)
  //     setItems([...x]);
  // }, []);

  const addProduct = async() => {
    console.log(image);

    if (itemTitle === "" || itemPrice === "" || image === "") {
      console.log("fields are empty");
    } else {
      const x = JSON.parse(localStorage.getItem("items"));
      if (x !== null) {
        const temp = [...x, { t: itemTitle, p: itemPrice, i: image }];
        setItems([...x, { t: itemTitle, p: itemPrice, i: image }]);
        localStorage.setItem("items", JSON.stringify(temp));

        itemHide();

        const res = await axios.post('http://localhost:8000/prod',{ t: itemTitle, p: itemPrice});
        
      } else {
        const temp = [{ t: itemTitle, p: itemPrice, i: image }];
        setItems([{ t: itemTitle, p: itemPrice, i: image }]);
        localStorage.setItem("items", JSON.stringify(temp));

        itemHide();

        const res = await axios.post('http://localhost:8000/prod',{ t: itemTitle, p: itemPrice});
        
      }
      
    }
  };

  const cartVis = () => {
    setShowCart("block");
    const x = JSON.parse(localStorage.getItem(name));
    if (x !== null) setCartItems([...x]);
  };

  const cartHide = () => {
    setShowCart("none");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Image = e.target.result;

      setImage(base64Image);
    };

    reader.readAsDataURL(file);
  };

  const call = () => {
    info();
  };

  return (
    <>
      <div className="home">
        {contextHolder}
        <div className="navbar">
          <div>
            <h1 className="logo">ZenStore</h1>
            <p className="tagLine">Powered by Zenmonk</p>
          </div>

          <Space size={16} onClick={onAvater} wrap>
            <Avatar
              size="large"
              style={{ backgroundColor: "white", color: "greenyellow" }}
              icon={<UserOutlined />}
            />
          </Space>
        </div>
        <div className="mainDiv">
          <div className="innerTop">
            <h2>Products</h2>
            <Button
              variant="contained"
              style={{ display: add }}
              onClick={itemVis}
            >
              Add Item
            </Button>
            <Button
              variant="contained"
              style={{ display: cart }}
              onClick={cartVis}
            >
              Cart
            </Button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {items.length === 0 ? (
              <div style={{ margin: "auto", textAlign: "center" }}>
                <img
                  src={empty}
                  height={100}
                  style={{
                    margin: "auto",
                    marginTop: "calc(100vh - 600px)",
                    boxShadow: "0px 70px 80px -25px gray",
                  }}
                />
                <p>No Product</p>
              </div>
            ) : (
              items.map((e, indx) => {
                return (
                  <Item
                    itemT={e.t}
                    itemP={e.p}
                    image={e.i}
                    item={cart}
                    red={add}
                    index={index}
                    itemIndex={indx}
                    call={call}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="popupBackground" style={{ display: visiblity }}>
        <div className="popupBox">
          <div className="popupTop">
            <h3>Profile</h3>
            <div className="exit" onClick={hide}></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input
                  onChange={updateUN}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  onChange={updatePass}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={update}
                  style={{
                    backgroundColor: "rgb(83, 143, 255)",
                    color: "white",
                  }}
                  htmlType="submit"
                  className="login-form-button"
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <div className="popupBackground" style={{ display: item }}>
        <div className="popupBox">
          <div className="popupTop">
            <h3>Add Item</h3>
            <div className="exit" onClick={itemHide}></div>
          </div>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <img
              src={image}
              height={150}
              width={150}
              style={{ backgroundColor: "#F0F0F0" }}
            />
            <br />
            <input
              type="file"
              style={{ marginBottom: 30 }}
              onChange={handleImageUpload}
            />

            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="title"
                rules={[{ required: true, message: "Please input title!" }]}
              >
                <Input placeholder="Title" onChange={title} />
              </Form.Item>
              <Form.Item
                name="price"
                rules={[{ required: true, message: "Please input price!" }]}
              >
                <Input placeholder="Price" onChange={price} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  onClick={addProduct}
                  style={{
                    backgroundColor: "rgb(83, 143, 255)",
                    color: "white",
                  }}
                  htmlType="submit"
                  className="login-form-button"
                >
                  add
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <div className="popupBackground" style={{ display: showcart }}>
        <div className="popupBox" style={{ width: "50%" }}>
          <div className="popupTop">
            <h3 style={{ display: "flex" }}>
              Cart Items<div className="count">{cartItems.length}</div>
            </h3>
            <div className="exit" onClick={cartHide}></div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: 30,
              width: "100%",
              display: "flex",
              overflow: "scroll",
            }}
          >
            {cartItems.length === 0 ? (
              <div style={{ margin: "auto", textAlign: "center" }}>
                <img
                  src={empty}
                  height={70}
                  style={{
                    margin: "auto",
                    boxShadow: "0px 70px 80px -25px gray",
                  }}
                />
                <p style={{ marginBottom: 60 }}>No Items</p>
              </div>
            ) : (
              cartItems.map((e, indx) => {
                return (
                  <Item
                    itemT={e.t}
                    itemP={e.p}
                    image={e.i}
                    item={"none"}
                    red={"none"}
                    index={index}
                    itemIndex={indx}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="profile" style={{ display: profileVis }}>
        <div className="popupTop">
          <p style={{ fontWeight: 500 }}>signed as</p>
          <div className="exit" onClick={out}></div>
        </div>
        <hr style={{ border: "1px solid #D6D6D6" }} />
        <div className="align">
          <img src={user} height={18} className="alignImg" />
          <p className="mLeft">{name}</p>
        </div>
        <div className="align">
          <img src={password} height={20} className="alignImg" />
          <p className="mLeft">{pass}</p>
        </div>
        <div className="align">
          <img src={img} height={18} className="alignImg" />
          <p className="mLeft">{prof}</p>
        </div>

        <Button
          variant="outlined"
          onClick={callFunctions}
          style={{ marginTop: 15, marginRight: 15 }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={logOut}
          style={{ marginTop: 15 }}
        >
          Logout
        </Button>
      </div>
    </>
  );
}

export default Home;
