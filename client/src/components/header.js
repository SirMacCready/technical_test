import React, { useState, useEffect } from 'react';
import './Header.css';
import openCart from '../js/opencart';
import refreshCart from '../js/refreshCart';
import delFromCart from '../js/deleteFromCart';

function Header({ showPayout }) {
  const [isHidden, setHidden] = useState(false);
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch('/api/v1/getproducts')
      .then((response) => response.json())
      .then((data) => setProductData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div id="navbar">
      <div id="right-side">
        <div id="login">Login</div>
        <div id="cart" onClick={ () =>{ 
           openCart(isHidden, setHidden);
           refreshCart(setData)
           }
           }>       
        <h3>Cart</h3>
        </div>
      </div>
      <div id="cart_extended">
        {isHidden && (
          <div className="title">
            <h3>Products in Cart:</h3>
            {data.length > 0 ? (
              data.map((product, index) => (
                <div className="productListed" key={index}>
                  <a className="productCart">
                    {productData.map((productName)=> {
                      if (productName.id === product.product_id) {
                        return (
                          <div className="productList">
                            <div id="cartItem" key={productName.id}>
                              <h2>
                                {productName.name} ({product.count})
                              </h2>
                            </div>
                            <div className="redbutton" onClick={() => delFromCart(productName.id)}>
                              X
                            </div>
                          </div>
                        );
                      }
                      return null; // Handle cases with no matching product name
                    })}
                  </a>
                </div>
              ))
            ) : (
              <div className="redbutton" onClick={() => refreshCart(setData)}>
                <p>Refresh Cart?</p>
              </div>
            )}
            <button onClick={() => {console.log(showPayout); showPayout()}}>Proceed To Payment</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
