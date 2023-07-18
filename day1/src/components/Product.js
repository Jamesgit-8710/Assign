import React from 'react'
import '../styles/product.css'

function Product({ title, price, img }) {
  return (
    <div className='prodLayout'>
      <img src={img} height={200} width={200} alt='product' />
      <h3>{title}</h3>
      <p>{price}</p>
    </div>
  );
}


export default Product