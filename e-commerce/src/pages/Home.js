import React, { useEffect, useState } from "react";
import "../styles/home.css";
import logo from "../assets/shopify.png";
import { Input } from "antd";
import user from "../assets/user.png";
import bag from "../assets/bag.png";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space } from "antd";
import { Carousel } from "antd";
import t1 from "../assets/t1.jpg";
import t2 from "../assets/t2.jpg";
import t3 from "../assets/t3.jpg";
import t4 from "../assets/t4.jpg";
import box from "../assets/box.png";
import logout from "../assets/logout.png";
import vendor from "../assets/cashier.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Product from "../components/Product";
import Profile from "../components/Profile";
import BestSeller from "../components/BestSeller";
import Cart from "../components/Cart";
import CosOrders from "../components/CosOrders";
import close from '../assets/close2.png';
import { del } from "../services/slices/user.slice";
import { useDispatch } from "react-redux";

const Home = () => {
  const id = localStorage.getItem("id");

  const [navigation, setNavigation] = useState(0);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [val, setVal] = useState(0);

  const [vis, setVis] = useState("none");
  const [vis2, setVis2] = useState("none");
  const [data, setData] = useState([]);
  const [stat, setStat] = useState(false);
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({});
  const [img, setImg] = useState()
  const [slt, setSlt] = useState("Category")

  const onClick = ({ key }) => {
    // message.info(`Click on item ${key}`);
    setSearch(key)

    if(key==="")
    setSlt("Category");
    else
    setSlt(key);
  };

  const items = [
    {
      label: "Cloths",
      key: "Cloths",
    },
    {
      label: "Electronics",
      key: "Electronics",
    },
    {
      label: "Shoes",
      key: "Shoes",
    },
    {
      label: "Accessories",
      key: "Accessories",
    },
    {
      label: "Furniture",
      key: "Furniture",
    },
    {
      label: "Unset",
      key: "",
    },
  ];

  const set = (e) => {
    setImg(e.images[0])
    setModal(e);
    setVis2("block");
  }

  const filtered = data.filter((i) => {
    if (i.productName.toLowerCase().includes(search.toLowerCase()))
      return i.productName.toLowerCase().includes(search.toLowerCase());
    else if (i.des.toLowerCase().includes(search.toLowerCase()))
      return i.des.toLowerCase().includes(search.toLowerCase());
    else if (i.cat.toLowerCase().includes(search.toLowerCase()))
      return i.cat.toLowerCase().includes(search.toLowerCase());
  });


  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("http://localhost:8000/getProduct");
      setData(res.data);
      // console.log(res.data);
      const res2 = await axios.post("http://localhost:8000/stat", { id: id });
      setStat(res2.data);
      console.log(res2.data);
      
      const res3 = await axios.post("http://localhost:8000/getUser", {
        id: id,
      });
      setUserData(res3.data);
    };

    getData();
  }, []);



  if (vis2 !== 'none') {
    return (
      <div style={{ height: "100vh", width: "100vw", backgroundColor: "white", display: vis2, position: "absolute", top: 0, left: 0 }} >
        <div style={{ color: "white", height: 20, paddingTop: 13, paddingRight: 15 }}><img src={close} height={15} style={{ float: "right" }} onClick={() => { setVis2("none") }} />l</div>
        <div style={{ height: "calc(100vh - 74px)", display: "flex" }}>
          <div style={{ height: "100%", width: "50%", padding: 20 }}>
            <div style={{ height: "100%", width: "100%", backgroundColor: "rgb(241, 243, 245)", backgroundImage: `url('${img}')`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }}></div>

          </div>
          <div style={{ height: "100%", width: "50%", padding: 20 }}>
            <div style={{ height: "70%", width: "100%", backgroundColor: "white" }}>
              <p style={{ fontSize: 40, fontWeight: 500 }}>{modal.productName}</p>
              <p style={{ fontSize: 20, fontWeight: 500, color: "rgba(0,0,0,0.4)" ,wordBreak: "break-word"}}>{modal.des}</p>
              <br />
              <p style={{ fontSize: 30, fontWeight: 500 }}>&#8377;{modal.price}</p>
            </div>
            <div style={{ height: "30%", width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center", border: "1px solid rgb(241, 243, 245)", borderRadius: 10 }}>
              <div style={{ height: "90%", width: "22%", backgroundColor: "rgb(241, 243, 245)", backgroundImage: `url('${modal.images[0]}')`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} onClick={() => {setImg(modal.images[0])}}></div>
              <div style={{ height: "90%", width: "22%", backgroundColor: "rgb(241, 243, 245)", backgroundImage: `url('${modal.images[1]}')`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} onClick={() => {setImg(modal.images[1])}}></div>
              <div style={{ height: "90%", width: "22%", backgroundColor: "rgb(241, 243, 245)", backgroundImage: `url('${modal.images[2]}')`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} onClick={() => {setImg(modal.images[2])}}></div>
              <div style={{ height: "90%", width: "22%", backgroundColor: "rgb(241, 243, 245)", backgroundImage: `url('${modal.images[3]}')`, backgroundRepeat: "no-repeat", backgroundSize: "contain", backgroundPosition: "center" }} onClick={() => {setImg(modal.images[3])}}></div>
            </div>
          </div>
        </div>
      </div>

    );
  } else {

    return (
      <div className="homeBackground">
        <div className="navbar">
          <div style={{ display: "flex", width: "40%" }}>
            <img src={logo} height={33} alt="logo" />
            <h2 style={{ marginLeft: 8, fontSize: 24, color: "#000F43" }}>
              Shopcart
            </h2>
            <Input
              placeholder="Search Product by name, category, description"
              style={{
                width: "100%",
                marginLeft: 30,
                borderRadius: 50,
                height: 35,
                minWidth: "11rem",
                display: navigation===1? "none":"block"
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <p
              style={{
                marginRight: 50,
                fontSize: 15,
                fontWeight: 500,
                marginTop: 3,
                marginLeft: 5,
                cursor: "pointer",
              }}
              onClick={() => {
                setNavigation(0);
              }}
            >
              Home
            </p>
            <Dropdown
              menu={{
                items,
                onClick,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space
                  style={{
                    marginRight: 50,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  {slt}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <p
              style={{
                marginRight: 50,
                fontSize: 15,
                fontWeight: 500,
                marginTop: 3,
                marginLeft: 5,
                cursor: "pointer",
              }}
              onClick={() => {
                setNavigation(1);
              }}
            >
              Best sellers
            </p>
            <div
              style={{
                height: 25,
                width: 25,
                backgroundImage: `url(${bag})`,
                backgroundSize: "contain",
                borderRadius: 7,
                cursor: "pointer",
              }}
              onClick={() => {
                setNavigation(2);
              }}
            ></div>
            <p
              style={{
                marginRight: 50,
                fontSize: 14,
                fontWeight: 500,
                marginTop: 3,
                marginLeft: 5,
                cursor: "pointer",
              }}
              onClick={() => {
                setNavigation(2);
              }}
            >
              Cart
            </p>
            <div
              style={{
                height: 25,
                width: 25,
                backgroundImage: `url(${user})`,
                backgroundSize: "contain",
                cursor: "pointer",
              }}
              onMouseEnter={() => {
                setVis("block");
              }}
              onMouseLeave={() => {
                setVis("none");
              }}
            ></div>
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                marginTop: 3,
                marginLeft: 5,
                cursor: "pointer",
              }}
              onMouseEnter={() => {
                setVis("block");
              }}
              onMouseLeave={() => {
                setVis("none");
              }}
            >
              Account
            </p>
          </div>
        </div>

        {navigation === 1 ? (
          <BestSeller set={set}/>
        ) : navigation === 2 ? (
          <Cart />
        ) : navigation === 3 ? (
          <Profile userData={userData} />
        ) : navigation === 4 ? (
          <CosOrders />
        ) : (
          <div>
            <div
              style={{
                width: "100vw",
                height: "80vh",
                display: search === "" ? "block" : "none",
              }}
            >
              <Carousel autoplay>
                <div>
                  <div
                    style={{
                      height: "80vh",
                      backgroundImage: `url(${t1})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "100%",
                    }}
                  ></div>
                </div>
                <div>
                  <div
                    style={{
                      height: "80vh",
                      backgroundImage: `url(${t2})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "100%",
                    }}
                  ></div>
                </div>
                <div>
                  <div
                    style={{
                      height: "80vh",
                      backgroundImage: `url(${t3})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "100%",
                    }}
                  ></div>
                </div>
                <div>
                  <div
                    style={{
                      height: "80vh",
                      backgroundImage: `url(${t4})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "100%",
                    }}
                  ></div>
                </div>
              </Carousel>
              {/* <div style={{height: 500, backgroundColor: "red"}}></div> */}
            </div>

            <div
              style={{
                height: "100%",
                width: "calc(100vw - 200px)",
                backgroundColor: search === "" ? "white" : "rgb(241, 243, 245)",
                padding: "50px 100px",
              }}
            >
              <h1 style={{ marginBottom: 40, marginLeft: 15 }}>Products</h1>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {filtered.map((i) => {
                  if (i.status === "p" && i.uploadedBy !== id)
                    return <Product item={i} show={true} set={set} />;
                })}
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            width: 150,
            backgroundColor: "white",
            display: vis,
            position: "absolute",
            top: 44,
            right: 35,
            borderRadius: 5,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            fontSize: 14,
            padding: 10,
          }}
          onMouseEnter={() => {
            setVis("block");
          }}
          onMouseLeave={() => {
            setVis("none");
          }}
        >
          <div style={{ display: "flex", cursor: "pointer" }}>
            <img src={user} height={16} />
            <p
              style={{ marginLeft: 10 }}
              onClick={() => {
                setNavigation(3);
              }}
            >
              My Profile
            </p>
          </div>
          <div style={{ display: "flex", marginTop: 15, cursor: "pointer" }}>
            <img src={box} height={16} />
            <p
              style={{ marginLeft: 10 }}
              onClick={() => {
                setNavigation(4);
              }}
            >
              Orders
            </p>
          </div>
          <div
            style={{
              display: stat === "v" ? "flex" : "none",
              marginTop: 15,
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/vendor");
            }}
          >
            <img src={vendor} height={20} />
            <p style={{ marginLeft: 10 }}>Vendor</p>
          </div>
          <div
            style={{ display: "flex", marginTop: 15, cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("id");
              dispatch(del());
            }}
          >
            <img src={logout} height={18} />
            <p style={{ marginLeft: 10 }}>Logout</p>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
