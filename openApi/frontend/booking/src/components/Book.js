import React, { useState } from "react";
import "../styles/book.css";
import { Button, Form, Input, DatePicker } from "antd";
import axios from "axios";

const Book = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

  const book = async() => {
    await axios.post("http://localhost:8000/sendDetails",{message: {from: from, to: to, date: date, name: name, age: age}});
  }

  return (
    <div className="book">
      <div className="innerDiv">
        <h3 className="heading">Booking</h3>
        <div>
          <Form name="basic" autoComplete="off">
            <Form.Item name="from">
              <Input placeholder="from" onChange={(e) => {setFrom(e.target.value);}} />
            </Form.Item>

            <Form.Item name="to">
              <Input placeholder="to" onChange={(e) => {setTo(e.target.value);}} />
            </Form.Item>

            <Form.Item>
              <DatePicker onChange={(date, dateString) => {setDate(dateString);}} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="name">
              <Input placeholder="name" onChange={(e) => {setName(e.target.value);}} />
            </Form.Item>

            <Form.Item name="age">
              <Input placeholder="age" type="number" onChange={(e) => {setAge(e.target.value);}} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                onClick={() => {book();}}
              >
                Book
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Book;
