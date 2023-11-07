var express = require('express');
var router = express.Router();

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

router.post('/v1/addToCart', (req, res) => {
    try{ // You can now access the data sent from the client in req.body
    const { name, price, stock } = req.body;
    console.log(name,price,stock);
    
  
    res.status(200).json({ message: 'Product added to cart' });
    }
    catch(error){
        console.log(error,"ERROR in sending data to cart");
    }
});

module.exports = router;