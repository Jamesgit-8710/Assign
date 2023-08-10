import React from "react";

type props = {
  text: String | number
};

const Container = (props: props) => {
  return (
    <div>
      Container {props.text}
    </div>
  );
};

export default Container;
