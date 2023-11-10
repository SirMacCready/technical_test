import React, { useState, useEffect } from 'react';
import ProductsInfo from './ProductInfo';

function ProductsDisplay() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/v1/getproducts')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const selectProduct = (product) => {
    setSelectedProduct(product);
  };
  return (
    <div className="container">
      <div className="left">
        <div className='searchbar'>
          <form action='/api/v1/getproducts' method='POST'>
            <input type='text' id="searchInput" name='searchInput' placeholder='jean, chapeau...'></input>
            <button type='submit'>Search !</button>
          </form>
        </div>
        <h2>Les Produits :</h2>
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product_listed" key={product.id}>
              <a className="productLink" onClick={() => selectProduct(product)}>
                <h2>{product.name}</h2>
              </a>
            </div>
          ))
        ) : (
          <p>Loading data...</p>
        )}
      </div>
      {selectedProduct && (
        <ProductsInfo
          id={selectedProduct.id}
          name={selectedProduct.name}
          price={selectedProduct.price}
          stock={selectedProduct.inventory}
        />
      )}
    </div>
  );
}

export default ProductsDisplay;
