//Fonction permettant de trouver les noms des articles dans la BDD suivant une recherche ou rien
const getProductsNames = (setProducts = () => {},productName ) =>{
  //fetch de la requête
    fetch(`/api/v1/getproducts/:${productName}`)
      .then((response) => response.json())
      //assignation des produits à un hook 
      .then((data) => setProducts(data))
      //Catch en cas d'erreur 
      .catch((error) => console.error('Error fetching data:', error));
}
export default getProductsNames