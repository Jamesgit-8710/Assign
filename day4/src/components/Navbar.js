import React from "react";
import '../styles/navbar.css'
import { Typography } from "antd";
import { Menu, Dropdown, Button } from 'antd';

const { Title } = Typography;

const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          Chandigarh
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          Mohali
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          Panchkula
        </a>
      </Menu.Item>
    </Menu>
);

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <Title className="white bold">Chandigarh</Title>
        <Title level={3} className="white">15 June 2023</Title>
      </div>
      <div>
        <Title level={3} className="white">WHETHER APP</Title>
      </div>
      <div>
        <div>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button className="btn">select</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
