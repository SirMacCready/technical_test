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

  const handleButtonClick = (productId) => {
    // Send a POST request with the product ID when the button is clicked
    fetch('/API/v1/api/processData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
    })
      .then((response) => {
        if (response.ok) {
          // Handle the success case
          window.location.href = '/ProductPage.html';
          console.log('POST request successful');
        } else {
          // Handle the error case
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
            <button onClick={() => handleButtonClick(product.id)}>click</button>
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default DataDisplay;
