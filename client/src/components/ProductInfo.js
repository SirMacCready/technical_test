import React, { useState } from 'react';
import addToCart from '../js/addToCart';

function ProductsInfo(props) {
  const [count, setCount] = useState(0);

  const handleChange = (event) => {
    const value = event.target.value;
    setCount(value);
  };

  const isAddToCartDisabled = !props.price;

  return (
    <div className="right">
      <h1>{props.name}</h1>
      <h1>{props.price}</h1>
      <h1>{props.stock}</h1>
      <input
        type="number"
        value={count}
        onChange={handleChange}
        min="0"
        max={props.stock}
        step="1"
      />

      <button disabled={isAddToCartDisabled} onClick={() => addToCart(props.id,count,props.stock,props.price)}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductsInfo;
