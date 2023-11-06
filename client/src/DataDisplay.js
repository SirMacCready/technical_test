import React, { useState, useEffect } from 'react';

function DataDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API here
    fetch('/API/v1/api/products')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Les Produits :</h2>
      {data.length > 0 ? (
        data.map((product, index) => (
          <div className="product_listed" key={index}>
            <a href={product.id}>{product.name}</a>
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default DataDisplay;
