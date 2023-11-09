import React, { useState } from 'react';

function ProductsInfo(props) {
  const [count, setCount] = useState(0);

  const handleChange = (event) => {
    const value = event.target.value;
    setCount(value);
  };

  const addToCart = () => {
    const data = {
      product_id: props.id,
      count,
      stock: props.stock,
      price: props.price
    };

    fetch('/api/v1/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          // Handle success or show a success message
        } else {
          console.error('Error adding to cart');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
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

      <button disabled={isAddToCartDisabled} onClick={addToCart}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductsInfo;
