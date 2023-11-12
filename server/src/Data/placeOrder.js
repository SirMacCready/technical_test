const mysql = require('mysql2');    

function placeorder() {
    return new Promise((resolve, reject) => {
      //infos de la BDD
        const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'technical_test',
        });
    
        //Connexion
        db.connect((err) => {
          if (err) {
            reject(err);
            return;
          }
    //Sélection du Panier
    const selectCart = 'SELECT * FROM user_cart';

    //exec de la requête
    db.query(selectCart, (error, results) => {
      if (error) {
        console.error('Error executing the first query:', error);
        res.status(500).send('An error occurred');
        return;
      }
      
      //récupération des résultats de la query1
      const dataFromQuery1 = results; 
      let totalPrice =0
      //Id aléatoire pour la commande
      let RGN = Math.floor(Math.random() * (2000000000  - 1000000000));
      //calcul du prix total et mapping des articles dans le panier
      const insertQueries = dataFromQuery1.map((item) => {
        const product_id = item.product_id;
        const count = item.count;
        const price = item.price 
        totalPrice += price * count;
        return [count, product_id, price,totalPrice,RGN];
      });
    
      
      //Insertion des articles commandés
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
      //Mise à jour des stocks 
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
      Promise.all(insertPromises)
        .then((insertResults) => {
          resolve(insertResults)
        })
        .then(() => {
        // Remise à zero de la table Panier
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
          console.error('Error executing one or more INSERT queries:', error);
          reject(error)
        });
    });
  });
          });
      };

module.exports = placeorder