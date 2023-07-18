import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../features/CartSlice";
import "../styles/cart.css";
import { Button, Form, Input, Select } from "antd";
import { DatePicker, Space } from "antd";
import { data } from "../store/Data";
import { Avatar, Badge } from "antd";

export function Cart() {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [to, setTo] = useState(0);
  const [date, setDate] = useState("");

  const onTitle = (e) => {
    setTitle(e.target.value);
  };

  const onDes = (e) => {
    setDes(e.target.value);
  };

  const onTo = (e) => {
    setTo(e);
  };

  const onDate = (date, dateString) => {
    setDate(dateString);
  };
  

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.users);

  const { Option } = Select;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const assign = () => {

    if (title !== "" && des !== "" && to !== 0 && date!=="  ") {
  
      let nam = "";
      let url = "";

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === to) {
          nam = data[i].nam
          url = data[i].url
          break;
        }
      }

      dispatch(addUser({ title: title, des: des, to: to, date: date, nam: nam, url: url }));
    }
  };

  const [form] = Form.useForm();

  return (
    <div className="outerDiv">
      <div className="innerDiv">
        <div className="topDiv">
          <Form
            className="inputs"
            {...layout}
            form={form}
            name="control-hooks"
            style={{ maxWidth: 600, marginTop: 30 }}
          >
            <Form.Item
              className="width"
              name="Title"
              label="Title"
              rules={[{ required: true }]}
            >
              <Input onChange={onTitle}  />
            </Form.Item>
            <Form.Item
              className="width"
              name="Description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input onChange={onDes} />
            </Form.Item>

            <Form.Item
              className="width"
              name="Assign to"
              label="Assign to :"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" onChange={onTo} allowClear>
                {data.map((e) => {
                  return <Option value={e.id}>{e.nam}</Option>;
                })}
                
              </Select>
            </Form.Item>

            <Space
              direction="vertical"
              style={{ marginLeft: 30 }}
              className="width"
            >
              <DatePicker onChange={onDate} style={{ width: "65%" }} />
            </Space>

            <Form.Item {...tailLayout} style={{ marginRight: "120px" }}>
              <Button
                onClick={assign}
                type="primary"
                htmlType="submit"
                className="width"
                style={{ marginTop: 20 }}
              >
                Assign
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="bottomDiv">
          <div className="header">
            <h2>Tasks</h2>
            {data.map((e) => {
              let c = 0;

              
                cart.filter((cart) => {
                  if (cart.to === e.id){
                    c++;
                  }
                });
              

              if (c !== 0) {
                return (
                  <Space size="middle" style={{ marginTop: 3 ,marginLeft: 12}}>
                    <Badge count={c}>
                      <Avatar
                        shape="square"
                        size="large"
                        style={{
                          backgroundImage: `url(${e.url})`,
                          backgroundSize: "contain",
                        }}
                      />
                    </Badge>
                  </Space>
                )
              }


            })}
          </div>
          <div>
            {cart.map((cart, key) => {

              return (
                <div key={key} style={{margin: "10px auto", padding: 5, width: "87%", backgroundColor: "aliceblue", display: "flex", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)" }}>
                  <Space size="middle" style={{display: "block"}}>
                    <Badge count={0}>
                      <Avatar
                        shape="square"
                        size="large"
                        style={{
                          backgroundImage: `url(${cart.url})`,
                          backgroundSize: "contain",
                        }}
                      />
                    </Badge>
                  </Space>
                  <div style={{ marginLeft: 5 }}>
                    <h4 style={{ margin: 0, textAlign: "left" }}>Task: {cart.title} &nbsp; Assign to: {cart.nam}</h4>
                    <p style={{ margin: 0, textAlign: "left" ,fontSize: "12px"}}>{cart.date}</p>
                    <p style={{ margin: 0, textAlign: "left" ,fontSize: "14px"}}>{cart.des}</p>
                  </div>
                </div>)
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
