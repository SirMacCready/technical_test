import React, { useState, useEffect } from 'react';

function DataDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from your API here
    fetch('/v1/api/products')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h2>Data from API</h2>
      <ul>
        {data.map((product, id) => (
          <li key={id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DataDisplay;
