const mysql = require('mysql');

async function queryAddToCart(productId, count, price) {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'technical_test',
  });

  try {
    await new Promise((resolve, reject) => {
      db.connect((error) => {
        if (error) {
          reject(error.message);
        } else {
          resolve();
        }
      });
    });

    const values = [productId, count, price];
    const findItemQuery = 'SELECT * FROM user_cart WHERE product_id = ?;';
    let results = await new Promise((resolve, reject) => {
      db.query(findItemQuery, values, (error, results) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(results)
        }
      });
    });

    const foundItem = results.length > 0;


    if (!foundItem) {
      const insertToCartQuery = 'INSERT INTO user_cart (product_id, count, price) VALUES (?, ?, ?)';
      await new Promise((resolve, reject) => {
        db.query(insertToCartQuery, values, (error, results) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(results);
          }
        });
      });
    }
    else {
      const values = [count,productId];
      const insertToCartQuery = 'UPDATE user_cart SET count = count + ? WHERE product_id = ? ';
      await new Promise((resolve, reject) => {
        db.query(insertToCartQuery, values, (error, results) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(results);
          }
        });
      });

    }
    const checkStockQuery = `SELECT user_cart.product_id FROM user_cart INNER JOIN products ON user_cart.product_id = products.id WHERE user_cart.count > products.inventory; `
    results = await new Promise((resolve, reject) => {
      
      db.query(checkStockQuery, (error, results) => {
        if (error) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    if (results.length > 0) {
      const values = results
      insertPromises = values.map((values) => {
        const correctCount = `UPDATE user_cart SET user_cart.count = (SELECT products.inventory FROM products WHERE user_cart.product_id = products.id) WHERE user_cart.product_id = 5; `;
    
        return new Promise((resolve, reject) => {
          db.query(correctCount, values, (error, results3) => {error
            if (error) {
              reject(error.message);
            } else {
              resolve(results3);
            }
          });
        });
      });
    }

    return foundItem;
  } finally {
    db.end(); // Close the database connection in the finally block to ensure it happens regardless of success or failure
  }
}

module.exports = queryAddToCart;
