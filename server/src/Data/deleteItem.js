const mysql = require('mysql2');    

function deleteItem(product_id) {
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
    
          const query = 'DELETE FROM user_cart WHERE product_id = ?;';
          const values = [product_id];
          db.query(query, values, (err, results) => {
            if (err) {
              console.error('Error inserting data:', err);
              reject(err); // Reject the promise in case of an error
            } else {
              console.log('Data deleted');
              db.end(); // Close the database connection
              resolve(results); // Resolve the promise with the results
            }
          });
        });
      });
    }

module.exports = deleteItem