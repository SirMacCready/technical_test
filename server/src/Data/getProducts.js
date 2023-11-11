// const mysql = require('mysql');
const mysql = require('mysql2');    
function getProducts(itemToFind) {
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
            const selectQuery = 'SELECT * FROM products WHERE name LIKE ?';
            db.query(selectQuery,itemToFind, (err, results) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(results); 
                }
            });
        });
    });
}

module.exports = getProducts