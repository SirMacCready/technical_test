var express = require('express');
var router = express.Router();
const queryAddToCart = require("../src/Data/Insert")
const getProducts = require('../src/Data/getProducts')

router.get('/v1/getproducts', async (req, res) => {
    try {
        const results = await getProducts();
        res.json(results);
    } 
    catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.post('/v1/addToCart', async (req, res) => {
    const { product_id,count,stock } = req.body;
    try {
      if (count > stock) {
        throw new Error('Count exceeds available stock');
      }
      await queryAddToCart(product_id, count);
      res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Error adding to cart' });
    }
  });
  

module.exports = router;