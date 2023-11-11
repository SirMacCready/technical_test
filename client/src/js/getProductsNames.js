import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory"

///get cart and send data to map
const getProductsNames = (setProducts = () => {},productName ) =>{
    fetch(`/api/v1/getproducts/:${productName}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
}
export default getProductsNames