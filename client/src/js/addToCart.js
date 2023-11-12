const addToCart = (id,count,stock,price) => {
    const data = {
      product_id: id,
      count,
      stock: stock,
      price: price
    };

    fetch('/api/v1/addToCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  };
export default addToCart