import React, { useState, useEffect } from 'react';

function DataDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/v1/products')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const selectProduct = (productId) => {
    fetch('/selectProduct', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => {
        if (response.ok) {
          // Ajouter l'action qui va se passer après le get du produit
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Les Produits :</h2>
      {data.length > 0 ? (
        data.map((product, index) => (
          <div className="product_listed" key={index}>
            <a href={product.id}>{product.name}</a>
            <button onClick={() => selectProduct(product.id)}>click</button>
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default DataDisplay;
