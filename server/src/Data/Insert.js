const mysql = require('mysql2');    

function queryAddToCart(productId,count,price) {
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'technical_test',
        });
    
        db.connect((err) => {
          if (err) {
            reject(err);
            return;
          }
    
          const query = 'INSERT INTO user_cart (product_id, count,price) VALUES (?, ?, ?)';
          const values = [productId, count,price];
          db.query(query, values, (err, results) => {
            if (err) {
              console.error('Error inserting data:', err);
              reject(err); // Reject the promise in case of an error
            } else {
              db.end(); // Close the database connection
              resolve(results); // Resolve the promise with the results
            }
          });
        });
      });
    }

module.exports = queryAddToCart