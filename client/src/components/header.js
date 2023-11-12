//Import des outils et fonctions 
import React, { useState, useEffect } from 'react';
import './Header.css';
import openCart from '../js/opencart';
import refreshCart from '../js/refreshCart';
import delFromCart from '../js/deleteFromCart';
import getProductsNames from '../js/getProductsNames';

//Composant en en-tête de page, on y retrouve la navbar, le panier et le boutton "Login"
function Header({ showPayout ,showLogin }) {
  //Etablisement des hooks
  const [isHidden, setHidden] = useState(false);
  const [data, setData] = useState([]);
  const [productData, setProducts] = useState([]);

  //Etablisement des noms produits afin que la fonction pour afficher le panier puisse les afficher
  useEffect(() => {
    getProductsNames(setProducts,"")
  }, []);

  //Le HTML, avec les differents fonctions et affichage dynamique des composants 
  return (
    <div id="navbar">
      <div id="right-side">
        <div id="login" onClick={() => {showLogin()}}>Login</div>
        <div id="cart" onClick={ () =>{ 
           openCart(isHidden, setHidden);
           refreshCart(setData)
           }
           }>       
        <h3>Cart</h3>
        </div>
      </div>
      <div id="cart_extended">
        {isHidden && ( //Affichage du panier quand on appuie sur le boutton "Cart"
          <div className="title">
            <h3>Products in Cart:</h3>
            {data.length > 0 ? (
              data.map((product, index) => (
                <div className="productListed" key={index}>
                  <h3 className="productCart">
                    {productData.map((productName)=> {
                      if (productName.id === product.product_id) {
                        return (
                          <div className="productList">
                            <div id="cartItem" key={productName.id}>
                              <h2>
                                {productName.name} ({product.count})
                              </h2>
                            </div>
                            <div className="redbutton" onClick={() => delFromCart(productName.id,productName.name)}>
                              X
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </h3>
                </div>
              ))
            ) : (
              <div className="redbutton" onClick={() => refreshCart(setData)}>
                <p>Refresh Cart?</p>
              </div>
            )}
            <button onClick={() => {showPayout()}}>Proceed To Payment</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
