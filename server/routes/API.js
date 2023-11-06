var express = require('express');
var router = express.Router();

const DBConnect = require('../src/Data/DataBase')
router.get('/v1/api/products', async (req, res) => {
    try {
        const results = await DBConnect();
        res.json(results);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});

router.post('v1/api/products', function (req, res) {
  console.log('req: ', req);
  console.log('res: ', res);
});


module.exports = router;