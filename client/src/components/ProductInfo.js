import React, { useState, useEffect } from 'react';

function ProductsInfo(props) {
  const addToCart = () => {
    // Prepare the data you want to send
    const data = {
      name: props.name,
      price: props.price,
      stock: props.stock,
    };

    // Send a POST request to your Express server
    fetch('/api/v1/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          console.log('sent');
        } else {
          // Handle an error response
          console.error('Error adding to cart');
        }
      })
      .catch((error) => {
        // Handle network error
        console.error('Network error:', error);
      });
  };

  return (
    <div className="right">
      <h1>{props.name}</h1>
      <h1>{props.price}</h1>
      <h1>{props.stock}</h1>
      <button disabled={!props.price} onClick={addToCart}>Add to cart</button>
    </div>
  );
}

export default ProductsInfo;
