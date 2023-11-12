// const mysql = require('mysql');
const mysql = require('mysql2');    
const bcrypt = require('bcrypt');
function logIn(email,password) {
    return new Promise( (resolve, reject) => {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'technical_test',
        });

        db.connect(async(err) => {
            if (err) {
                reject(err); 
                return;
            }

            const addUserQuery = 'SELECT * FROM users WHERE email = ? ';
            const values = [email]
            const results = db.query(addUserQuery, values, async (err, results) => {
                try {
                    if (!results || results.length === 0) {
                        throw new Error('User not found');
                    }
            
                    const hashedPasswordFromDatabase = results[0].password;
            
                    const match = await bcrypt.compare(password, hashedPasswordFromDatabase);
            
                    if (!match) {
                        throw new Error('Password does not match');
                    }
                    resolve(results[0].id);
                } catch (error) {
                    reject(error.message)
                }
            });
        });
    });
}

module.exports = logIn