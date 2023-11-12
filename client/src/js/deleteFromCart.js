import refreshCart from './refreshCart';
const delFromCart = (product_id,productName) => {
    const data = {
      product_id,
      productName
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
          console.log("OK");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });

  };
  export default delFromCart