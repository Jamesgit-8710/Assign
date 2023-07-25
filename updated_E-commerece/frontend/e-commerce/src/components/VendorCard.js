import React, { useEffect, useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSS } from "../redux/slices/user.slice";

const VendorCard = ({ item }) => {
  const id = localStorage.getItem("id");
  let x = "";
  const dispatch = useDispatch();

  const [stat, setStat] = useState(item.status);

  // console.log(item.prof)

  if (stat) {
    x = "Active";
  } else x = "Disable";

  const [prof, setProf] = useState(x);

  const handleMenuClick = async (e) => {

    if (e.key === "1") {
      setProf("Active");
      setStat(true);
      const res = await axios.post(`${process.env.REACT_APP_PATH}updateKey`, {
        id: item._id,
        key: true,
      });
    } else {
      setProf("Disable");
      setStat(false);
      const res2 = await axios.post(`${process.env.REACT_APP_PATH}updateKey`, {
        id: item._id,
        key: false,
      });
    }
  };

  const items = [
    {
      label: stat ? "Disable" : "Active",
      key: stat ? "0" : "1",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  useEffect(() => {
    // const res = await axios.post('http://localhost:8000/exist',{user: user.email})
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgb(241, 243, 245)",
        width: "calc(100% - 60px)",
        margin: "6px auto",
        display: "flex",
        justifyContent: "space-between",
        padding: 10,
      }}
    >
      <p style={{ fontSize: 15, display: "flex" }}>
        <div
          style={{
            height: 10,
            width: 10,
            backgroundColor: stat ? "rgb(55, 255, 145)" : "red",
            borderRadius: "50%",
            margin: "7px 10px 0px",

          }}
        ></div>
        {item.username}
      </p>

      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            {prof}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default VendorCard;
