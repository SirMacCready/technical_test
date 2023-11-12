const mysql = require('mysql2');    
function    addUser(email,password) {
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
                reject(error); 
                return;
            }
            //Query pour ajouter un utilisateur 
            const addUserQuery = 'INSERT INTO users (email,password) VALUES (?,?)';
            //binding des valeurs pour éviter les injections
            const values = [email,password]
            //execution de la query
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