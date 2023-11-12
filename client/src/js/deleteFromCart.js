//fonction pour retirer des articles de son panier
const delFromCart = (product_id,productName) => {
    //Les information permettant de retirer et d'afficher l'article retiré
    const data = {
      product_id,
      productName
    };

    //Fetch de la requête 
    fetch('/api/v1/deleteFromCart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          //Reload en cas de succès
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });

  };
  export default delFromCart