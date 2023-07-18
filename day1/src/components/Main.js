import {useState } from "react";
import Product from "./Product";
import "../styles/main.css";
import data from "../data/products.json";

const Main = (props) => {
    // console.log(props.data)
    // console.log(props.data)
    // console.log(data.products[0].title)

    //const [item,setItem] = useState(props.data);
    //const [items, setItems] = useState(props.data ? props.data.products : []);

    const [items, setItems] = useState(data.products);

    const filteredItems = items.filter((item) => {
      return item.title.toLowerCase().includes(props.data.toLowerCase());
    });

    console.log(filteredItems);
    
    // const f = data.filter((item) => {
    //     return data.title.toLowerCase().includes(item.toLowerCase());
    // })
    

  return (
    <div>
      {filteredItems.map((e) => {
        return <Product title={e.title} price={e.price} img={e.thumbnail}/>
      })} 
    </div>
  );
};

export default Main;
