const mysql = require('mysql');

async function queryAddToCart(productId, count, price) {
  //infos de la BDD
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'technical_test',
  });

  try {
    //Connexion
    await new Promise((resolve, reject) => {
      db.connect((error) => {
        if (error) {
          reject(error.message);
        } else {
          resolve();
        }
      });
    });

    //binding des valeurs pour éviter les injections
    const values = [productId, count, price];
    //Query pour trouver les articles dans le panier
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
    //vérifier si des articles on été trouvés
    const foundItem = results.length > 0;

    //si il n'y en a pas, ajout de l'article, 
    if (!foundItem) {
      //Query pour ajouter l'article
      const insertToCartQuery = 'INSERT INTO user_cart (product_id, count, price) VALUES (?, ?, ?)';
      await new Promise((resolve, reject) => {
        //exec de la requête
        db.query(insertToCartQuery, values, (error, results) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(results);
          }
        });
      });
    }
    //si il y en a, mise à jour de la quantité dans le panier 
    else {
      //binding des valeurs pour éviter les injections
      const values = [count,productId];
      //Query pour mettre à jour le nouveau montant 
      const insertToCartQuery = 'UPDATE user_cart SET count = count + ? WHERE product_id = ? ';
      await new Promise((resolve, reject) => {
        //execution de la query
        db.query(insertToCartQuery, values, (error, results) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(results);
          }
        });
      });

    }

    //Query pour sélectionner les articles dans le panier où leurs count est > que le stock 
    const checkStockQuery = `SELECT user_cart.product_id FROM user_cart INNER JOIN products ON user_cart.product_id = products.id WHERE user_cart.count > products.inventory; `
    results = await new Promise((resolve, reject) => {
      //execution de la query
      db.query(checkStockQuery, (error, results) => {
        if (error) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    // Si il y en a, équilibrage avec le nombre en stock de l'article
    if (results.length > 0) {
      const values = results
      insertPromises = values.map((values) => {
        const correctCount = `UPDATE user_cart SET user_cart.count = (SELECT products.inventory FROM products WHERE user_cart.product_id = products.id) WHERE user_cart.product_id = ?; `;
    
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
    db.end();
  }
}

module.exports = queryAddToCart;
