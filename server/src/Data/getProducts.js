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
        
        db.connect((error) => {
            if (error) {
                reject(error.message); 
                return;
            }
            const selectQuery = 'SELECT * FROM products WHERE name LIKE ?';
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