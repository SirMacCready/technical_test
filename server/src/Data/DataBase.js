const mysql = require('mysql');

function DBConnect() {
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
            console.log('Connected to MySQL database');

            const query = 'SELECT * FROM products';

            db.query(query, (err, results) => {
                if (err) {
                    reject(err); 
                } else {
                    resolve(results); 
                }
            });
        });
    });
}

module.exports = DBConnect