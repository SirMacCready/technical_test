import React, { useState, useEffect } from 'react';
import "./header.css"
function Header(props) {
    
    const [ishidden, setHidden] = useState(false);
    const [data, setData] = useState([]);
    const [productData, setProductData] = useState([]);
    const refreshCart = () => {
      fetch('/api/v1/getCart')
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => console.error('Error fetching data:', error));}

    const openCart = event => {
        setHidden(current => !current);
        if (ishidden === false){
          refreshCart()
        }}
    const delFromCart = (product_id) => {
        // Prepare the data you want to send
        const data = {
          product_id: product_id,
        };
        fetch('/api/v1/deleteFromCart', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                //Mettre un message de réussite
              } else {
                // Handle an error response
                console.error('Error adding to cart');
              }
            })
            .catch((error) => {
              // Handle network error
              console.error('Network error:', error);
            });
            refreshCart()
        };
    
    useEffect(() => {
        fetch('/api/v1/getproducts')
            .then((response) => response.json())
            .then((data) => setProductData(data))
            .catch((error) => console.error('Error fetching data:', error));
        }, []);
    return (
        <div id="navbar">
        <div id="right-side">
          <div id="login">login</div>
          <div id='cart' onClick={openCart}>
            <h3>Cart</h3>
          </div>
        </div>
        <div id="cart_extended">
          {ishidden && (
            <div className='title'>
              <h3>Products in Cart :</h3>
              {data.length > 0 ? (
                data.map((product, index) => (
                  <div className="productListed" key={index}>
                    <a className="productCart">
                      {productData.map((productName, index) => {
                        if (productName.id === product.product_id) {
                          return (
                            <div className='productList'>
                              <div id="cartItem" ><h2 key={index}>
                                {productName.name} ({product.count})
                              </h2> </div>
                              <div className="redbutton" onClick={() => delFromCart(productName.id)}>X</div>
                            </div>
                          );
                        }
                        return null; // You can also handle cases where there is no matching product name
                      })}
                    </a>
                  </div>
                ))
              ) : (
                <div className="redbutton" onClick={() => refreshCart()}><p>Refresh Cart ?</p></div>
              )}
              
            <button>Proceed To payout</button>
            </div>
          )}
        </div>
      </div>
      
    );
              }
export default Header;