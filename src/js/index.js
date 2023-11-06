document.addEventListener('DOMContentLoaded', async () => {
  const dataList = document.getElementById('data-list');

  try {
      const response = await fetch('/v1/api/products');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Update your HTML with the data
      data.forEach((product) => {
          const listItem = document.createElement('li');
          listItem.textContent = product.name; // Adjust this based on your database schema
          dataList.appendChild(listItem);
      });
  } catch (error) {
      console.error('Fetch error:', error);
      dataList.textContent = 'Error fetching data';
  }
});
