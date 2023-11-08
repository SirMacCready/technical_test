import React, { useState, useEffect } from 'react';

function ProductsDisplay() {
    return (
      <div className="header">
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
          <ProductsInfo id = {productId} name={name} price={price} stock={stock} />
        
      </div>
    );
  }