const mysql = require('mysql2');    

function deleteItem(product_id) {
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'technical_test',
        });
    
        db.connect((error) => {
          if (error) {
            reject(error.message);
            return;
          }
    
          const query = 'DELETE FROM user_cart WHERE product_id = ?;';
          const values = [product_id];
          db.query(query, values, (error, results) => {
            if (error) {
              reject(error.message);
            } else {
              db.end();
              resolve(results); 
            }
          });
        });
      });
    }

module.exports = deleteItem