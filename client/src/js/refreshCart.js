//fonction permettant de rafraîchir le panier
const refreshCart = async (setData = () => {}) => {
    try {
      //fetch de la requête de rafraîchissement
       const response = await fetch('/api/v1/getCart');
       const data = await response.json();
       //assignation des données au hook data
       setData(data);
    } catch (error) {
       console.error('Error fetching data:', error);
    }
 };
 
  export default refreshCart