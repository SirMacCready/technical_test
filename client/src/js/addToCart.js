//Fonction permettant d'ajouter des articles à son panier
const addToCart = (id,count,stock,price) => {
    //Les informations sur l'article
    const data = {
      product_id: id,
      count,
      stock: stock,
      price: price
    };

    //fetch de la requête POST 
    fetch('/api/v1/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          //Reload de la page en cas de succès
          window.location.reload();
        }
      })
      .catch((error) => {
        //Erreur de connection 
        console.error('Network error:', error);
      });
  };
export default addToCart