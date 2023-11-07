import React, { useState, useEffect } from 'react';
import ProductsInfo from './ProductInfo';

import "../index.css"
function ProductsDisplay() {
  const [name, setName] = useState("Choose A Product");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/v1/getproducts')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const selectProduct = (productId,productName,productPrice,productInventory) => {
    // Assuming you fetch the updated product data based on the selected productId
    // and update the state with the new values
    // Example:
        setName(productName);
        setPrice(productPrice);
        setStock(productInventory);
  };

  return (
    <div className="container">
      <div className="left">
      <h2>Les Produits :</h2>
      {data.length > 0 ? (
        data.map((product, index) => (
          <div className="product_listed" key={index}>
            <h2>{product.name}</h2>
            <button onClick={() => selectProduct(product.id,product.name,product.price,product.inventory)}>click</button>
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
      </div>
        <ProductsInfo name={name} price={price} stock={stock} />
      
    </div>
  );
}

export default ProductsDisplay;
