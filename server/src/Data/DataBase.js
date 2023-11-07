// const mysql = require('mysql');
const mysql = require('mysql2');    
function DBConnect() {
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

            const query = 'SELECT * FROM products';

            db.query(query, (err, results) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(results); 
                }
            });
        });
    });
}
function queryAddToCart(userId,productId,count) {
    console.log("eeeeeeeeeeeeeeeeeeeeeeee");
    return new Promise((resolve, reject) => {
        console.log('in the insertion');
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
    
          const query = 'INSERT INTO user_cart (user_id, product_id, count) VALUES (?, ?, ?)';
          const values = [userId, productId, count];
          console.log('before query');
          db.query(query, values, (err, results) => {
            
            console.log('after query');
            if (err) {
              console.error('Error inserting data:', err);
              reject(err); // Reject the promise in case of an error
            } else {
              console.log('Data inserted successfully:', results);
              db.end(); // Close the database connection
              resolve(results); // Resolve the promise with the results
            }
          });
        });
      });
    }

module.exports = DBConnect,queryAddToCart