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

        db.connect((err) => {
            if (err) {
                reject(err); 
                return;
            }

            const query = 'SELECT * FROM user_cart';

            db.query(query, (err, results) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(results); 
                }
                console.log(results);
            });
        });
    });
}

module.exports = getCart