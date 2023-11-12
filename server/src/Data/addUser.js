// const mysql = require('mysql');
const mysql = require('mysql2');    
function    addUser(email,password) {
    return new Promise((resolve, reject) => {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'technical_test',
        });

        db.connect((error) => {
            if (error) {
                reject(error); 
                return;
            }

            const addUserQuery = 'INSERT INTO users (email,password) VALUES (?,?)';
            const values = [email,password]
            db.query(addUserQuery, values, (error, results) => {
                if (error) {
                    reject(error); 
                } else {
                    resolve(results); 
                }
            });
        });
    });
}

module.exports = addUser