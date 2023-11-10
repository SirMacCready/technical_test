import refreshCart from './refreshCart';
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
  export default delFromCart