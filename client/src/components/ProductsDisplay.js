import React, { useState, useEffect } from 'react';
import ProductsInfo from './ProductInfo';
import getProductsNames from '../js/getProductsNames';
import selectProduct from '../js/selectProduct';

function ProductsDisplay() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    getProductsNames(setProducts,"")
  }, []);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Use the current value of searchInput to update the form action
    // const formAction = `/api/v1/getproducts/${searchInput}`;
    getProductsNames(setProducts,searchInput)
  };

  return (
    <div className="container">
      <div className="left">
        <div className='searchbar'>
          <form onSubmit={handleSubmit}>
            <input type="text" id="searchInput"name="searchInput"placeholder="jean, chapeau..."value={searchInput}onChange={handleInputChange}></input>
            <button type='submit'>Search !</button>
          </form>
        </div>
        <h2>Les Produits :</h2>
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product_listed" key={product.id}>
              <a className="productLink" onClick={() => selectProduct(setSelectedProduct,product)}>
                <h2>{product.name}</h2>
              </a>
            </div>
          ))
        ) : (
          <p>Currently loading products, your item is maybe not available</p>
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
