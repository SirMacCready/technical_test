// const mysql = require('mysql');
const mysql = require('mysql2');    
function getProducts(itemToFind) {
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
            //Query pour sélectionner les articles suivant si il ya recherche ou pas
            const selectQuery = 'SELECT * FROM products WHERE name LIKE ?';
            //execution de la query
            db.query(selectQuery,itemToFind, (error, results) => {
                if (error) {
                    reject(error.message); 
                } else {
                    resolve(results); 
                }
            });
        });
    });
}

module.exports = getProducts