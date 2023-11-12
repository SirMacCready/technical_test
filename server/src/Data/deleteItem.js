const mysql = require('mysql2');    

function deleteItem(product_id) {
    return new Promise((resolve, reject) => {
      //infos de la BDD
        const db = mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'technical_test',
        });

        //Connexion
        db.connect((error) => {
          if (error) {
            reject(error.message);
            return;
          }
          //Query pour retirer un article du panier utilisateur
          const query = 'DELETE FROM user_cart WHERE product_id = ?;';
          //binding des valeurs pour éviter les injections
          const values = [product_id];
          //execution de la query
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