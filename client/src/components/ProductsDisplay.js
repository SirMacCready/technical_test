import React, { useState, useEffect } from 'react';
import ProductsInfo from './ProductInfo';
import getProductsNames from '../js/getProductsNames';
import selectProduct from '../js/selectProduct';

//Composant pour afficher les produits trouvé dans la BDD ou les produits trouvé suivant une recherche  
function ProductsDisplay() {
  //Hooks
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("")

  //Etablissement des noms des produits afin de les afficher
  useEffect(() => {
    getProductsNames(setProducts,"")
  }, []);

  //Fonction qui détecte le changement dans l'input et assigne la nouvelle valeur à searchInput
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  //Permet de Submit et de faire la recherche de produits 
  const handleSubmit = (event) => {
    event.preventDefault();

    //Get des produits avec un nom similaire à searchInput
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
        {//Mapping des produits trouvés dans la BDD
        products.length > 0 ? (
          products.map((product) => (
            <div className="product_listed" key={product.id}>
              <a className="productLink" onClick={() => selectProduct(setSelectedProduct,product)}>
                <h2>{product.name}</h2>
              </a>
            </div>
          ))
        ) : (
          //Réponse par défaut en cas de chargement long ou si la recherche n'a rien donné
          <p>Currently loading products, your item is maybe not available</p>
        )}
      </div>
    
      {//Affichage des infos sur les produits à droite 
      selectedProduct && (
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
