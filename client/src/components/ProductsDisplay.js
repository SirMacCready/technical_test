import React, { useState, useEffect } from 'react';
import ProductsInfo from './ProductInfo';
function ProductsDisplay() {
  const [productId, setId] = useState("");
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
        setId(productId)
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
              <a className="productLink" onClick={() => selectProduct(product.id,product.name,product.price,product.inventory)}><h2>{product.name}</h2></a>
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
        <ProductsInfo id = {productId} name={name} price={price} stock={stock} />
      
    </div>
  );
}

export default ProductsDisplay;
