var express = require('express');
var router = express.Router();
const queryAddToCart = require("../src/Data/Insert")
const getProducts = require('../src/Data/getProducts')
const getCart = require('../src/Data/getCart')
const deleteItem = require('../src/Data/deleteItem')
const placeOrder = require('../src/Data/placeOrder')

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

router.get('/v1/getCart', async (req, res) => {
  try {
      const results = await getCart();
      res.json(results);
  } 
  catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});
router.post('/v1/addToCart', async (req, res) => {
    const { product_id,count,stock,price } = req.body;
    try {
      if (count > stock || count <= 0) {
        throw new Error('Count exceeds available stock');
      }
      await queryAddToCart(product_id, count,price);
      res.status(200).json({ message: 'Product added to cart' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Error adding to cart' });
    }
  });

router.post('/v1/confirmPurchase', async (req, res) => {
  const { cardNumber,cardHolder,expiryDate,cvv } = req.body;
  try {
    // if(cardNumber.length < 16 || cardNumber.length > 16 || cvv.length > 3 || cvv.length < 3) {
    //   throw new Error('Something is wrong in your credentials, please retry') 
    // }
    await placeOrder();
    res.status(200).json({ message: 'OrderPlaced' });

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Error in payment' });
  }
});

router.delete('/v1/deleteFromCart', async (req, res) => {
  const {product_id} = req.body
  try {
      const results = await deleteItem(product_id);
      res.json(results);
  } 
  catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
});

module.exports = router;