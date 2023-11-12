var express = require('express');
var router = express.Router();
const queryAddToCart = require("../src/Data/Insert")
const getProducts = require('../src/Data/getProducts')
const getCart = require('../src/Data/getCart')
const deleteItem = require('../src/Data/deleteItem')
const placeOrder = require('../src/Data/placeOrder')
const errorMessage = require('../src/js/serverError');

router.get('/v1/getproducts/:productName', async (req, res) => {
    let productName = req.params.productName;

    productName= "%" + productName.slice(1) + "%";
    try {
        const results = await getProducts(productName);
        res.json(results);
    } 
    catch (error) {
        errorMessage(error,res)
    }
});
router.get('/v1/getCart', async (req, res) => {
  try {
      const results = await getCart();
      res.json(results);
  } 
  catch (error) {
      errorMessage(error,res)
  }
});
router.post('/v1/addToCart', async (req, res) => {
    const { product_id,count,stock,price } = req.body;
    try {
      if (count > stock || count <= 0) {
        throw new Error('Count exceeds available stock');
      }
      await queryAddToCart(product_id, count,price);
      errorMessage("product added !",res)
    }
    catch (error) {
        errorMessage(error.message,res)
    }
  });

router.post('/v1/confirmPurchase', async (req, res) => {
  const { cardNumber,cardHolder,expiryDate,cvv } = req.body;
  try {
    // if(cardNumber.length < 16 || cardNumber.length > 16 || cvv.length > 3 || cvv.length < 3) {
    //   throw new Error('Something is wrong in your credentials, please retry') 
    // }
    await placeOrder();
    errorMessage("Order placed ! Thank you !",res)

  } 
  catch (error) {
      errorMessage(error.message,res)
  }
});

router.delete('/v1/deleteFromCart', async (req, res) => {
  const {product_id,productName} = req.body
  try {
      await deleteItem(product_id);
      errorMessage(productName + " has been deleted from your cart ",res)
  } 
  catch (error) {
      errorMessage(error,res)
  }
});

module.exports = router;