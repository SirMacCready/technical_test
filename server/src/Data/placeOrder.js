const mysql = require('mysql2');    

function placeorder() {
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
    
          // Query to retrieve data from a table
    const selectCart = 'SELECT * FROM user_cart';

    db.query(selectCart, (error, results) => {
      if (error) {
        console.error('Error executing the first query:', error);
        res.status(500).send('An error occurred');
        return;
      }
    
      // Use the result to construct multiple INSERT queries
      const dataFromQuery1 = results; // Data retrieved from the first query
      let totalPrice =0
      let RGN = Math.floor(Math.random() * (2000000000  - 1000000000));
      const insertQueries = dataFromQuery1.map((item) => {
        const product_id = item.product_id;
        const count = item.count;
        const price = item.price 
        totalPrice += price * count;
        return [count, product_id, price,totalPrice,RGN];
      });
    
      // Execute multiple INSERT queries in parallel using Promise.all
      
      
      insertPromises = insertQueries.map((values) => {
        values[3] = totalPrice
        const placeOrder = `INSERT INTO OrderItems (quantity, product_id, price_per_item,total_price, order_id)
          VALUES (?,?,?,?,?);`;
    
        return new Promise((resolve, reject) => {
          db.query(placeOrder, values, (error, results2) => {
            if (error) {
              console.error('Error executing one of the INSERT queries:', error);
              reject(error);
            } else {
              resolve(results2);
            }
          });
        });
      });
      insertPromises = insertQueries.map((values) => {
        const stockDecreaseQuery = `UPDATE products SET inventory = inventory - ? WHERE id = ?`;
    
        return new Promise((resolve, reject) => {
          db.query(stockDecreaseQuery, values, (error, results3) => {
            if (error) {
              console.error('Error executing one of the INSERT queries:', error);
              reject(error);
            } else {
              resolve(results3);
            }
          });
        });
      });
      // Wait for all INSERT queries to complete
      Promise.all(insertPromises)
        .then((insertResults) => {
          // Process the results of the INSERT queries if needed
          // Send a response or perform other actions as needed
          resolve(insertResults)
        })
        .then(() => {
        const truncateQuery = `TRUNCATE TABLE user_cart;` 
        db.query(truncateQuery, (error, results2) => {
          if (error) {
            console.error('Error executing one of the INSERT queries:', error);
            reject(error);
          } else {
            resolve(results2);
          }
        });})
        .catch((error) => {
          // Handle errors from the INSERT queries
          console.error('Error executing one or more INSERT queries:', error);
          reject(error)
        });
    });
  });
          });
      };

module.exports = placeorder