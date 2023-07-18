import React from "react";
import { Button } from "@mui/material";
import { Card } from "antd";
const { Meta } = Card;

function Item({ itemT, itemP, image, item, red, index, itemIndex, call }) {
  const add = () => {
    const x = JSON.parse(localStorage.getItem("users"));
    const UN = x[index].u;

    const y = JSON.parse(localStorage.getItem(UN));

    if (y !== null) {
      const temp = [...y, { t: itemT, p: itemP, i: image }];
      localStorage.setItem(UN, JSON.stringify(temp));
      call();
    } else {
      const temp = [{ t: itemT, p: itemP, i: image }];
      localStorage.setItem(UN, JSON.stringify(temp));
      call();
    }
  };

  const del = () => {
    const x = JSON.parse(localStorage.getItem("items"));

    const temp = x.filter((e, index) => itemIndex !== index);

    localStorage.setItem("items", JSON.stringify(temp));
  };

  return (
    <Card
      hoverable
      style={{ height: 300, width: 260, margin: 15, textAlign: "center" }}
      cover={
        <img
          alt="example"
          height={150}
          src={image}
          style={{ objectFit: "contain" }}
        />
      }
    >
      <Meta
        title={"Product : " + itemT}
        description={"Price : " + itemP}
        style={{ fontSize: "1rem", marginBottom: 10 }}
      />
      <Button
        variant="contained"
        style={{ margin: "auto", display: item }}
        onClick={add}
      >
        Add to cart
      </Button>
      <Button
        variant="contained"
        style={{ margin: "auto", display: red, backgroundColor: "red" }}
        onClick={del}
      >
        Remove
      </Button>
    </Card>
  );
}

export default Item;
