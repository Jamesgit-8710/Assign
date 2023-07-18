import React, { useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";

const Drop = ({sent}) => {

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

  const [val, setVal] = useState("Published");
  const [val2, setVal2] = useState("p");

  const handleMenuClick = ({key}) => {
    if (key === "1") {
      setVal("Published");
      setVal2("p");
      sent('p')
    } else if (key === "2") {
      setVal("Draft");
      setVal2("d");
      sent('d')
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown menu={menuProps}>
        <Button style={{marginRight: 30}}>
          <Space>
            {val}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};

export default Drop;
