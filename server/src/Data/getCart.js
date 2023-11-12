// const mysql = require('mysql');
const mysql = require('mysql2');    
function getCart() {
    
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