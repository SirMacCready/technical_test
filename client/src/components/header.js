import React, { useState, useEffect } from 'react';
import './Header.css';

function Header(props) {
  const [isHidden, setHidden] = useState(false);
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);

  const refreshCart = () => {
    fetch('/api/v1/getCart')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  const openCart = () => {
    setHidden((current) => !current);
    if (!isHidden) {
      refreshCart();
    }
  };

  const delFromCart = (product_id) => {
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
          // Handle success or show a success message
        } else {
          console.error('Error deleting from cart');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });

    refreshCart();
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
        <div id="login">Login</div>
        <div id="cart" onClick={openCart}>
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
                    {productData.map((productName) => {
                      if (productName.id === product.product_id) {
                        return (
                          <div className="productList">
                            <div id="cartItem" key={index}>
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
              <div className="redbutton" onClick={() => refreshCart()}>
                <p>Refresh Cart?</p>
              </div>
            )}
            <button onClick={() => {}}>Proceed To Payment</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
