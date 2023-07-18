import React from "react";

const Msg = ({ item, color, bgColor, float }) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "auto",
          overflow: "hidden",
          wordBreak: "break-all",
        }}
      >
        <div
          style={{
            backgroundColor: bgColor,
            color: color,
            borderRadius: 20,
            padding: "10PX 20PX",
            margin: 10,
            display: "inline-block",
            float: float
          }}
        >
          {item.text}
        </div>
      </div>

    </>
  );
};

export default Msg;
