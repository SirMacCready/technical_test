const mysql = require('mysql2');    
function getCart() {
    //infos de la BDD
    return new Promise((resolve, reject) => {
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

            //Query pour récupérer le panier 
            const query = 'SELECT * FROM user_cart';

            db.query(query, (error, results) => {
                if (error) {
                    reject(error.message); 
                } else {
                    resolve(results); 
                }
            });
        });
    });
}

module.exports = getCart