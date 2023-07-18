import React from 'react'
import dark from "../assets/cloud.png";
import { Card } from "antd";
import '../styles/list.css'
const { Meta } = Card;

function Cards() {
  return (
    <div>
        <Card className="dayCard"
          hoverable
          style={{ width: 60 }}
          cover={
            <img
              alt="example"
              src={dark}
            />
          }
        >
          <Meta title="35 C" description="6:00" />
        </Card>
    </div>
  )
}

export default Cards