var express = require('express');
var router = express.Router();
const queryAddToCart = require("../src/Data/DataBase")

const DBConnect = require('../src/Data/DataBase')
router.get('/v1/getproducts', async (req, res) => {
    try {
        const results = await DBConnect();
        res.json(results);
    } 
    catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.post('/v1/addToCart', async (req, res) => {
    console.log('in the POST');
    const { name, price, stock } = req.body;
    
    try {
      await queryAddToCart(name, price, stock);
      res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Error adding to cart' });
    }
  });
  

module.exports = router;