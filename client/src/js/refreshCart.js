const refreshCart = async (setData = () => {}) => {
    try {
       const response = await fetch('/api/v1/getCart');
       const data = await response.json();
       setData(data);
    } catch (error) {
       console.error('Error fetching data:', error);
    }
 };
 
  export default refreshCart