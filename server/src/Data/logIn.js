// const mysql = require('mysql');
const mysql = require('mysql2');    
const bcrypt = require('bcrypt');
function logIn(email,password) {
    return new Promise( (resolve, reject) => {
        //infos de la BDD
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'technical_test',
        });

        //Connexion
        db.connect(async(err) => {
            if (err) {
                reject(err); 
                return;
            }
            //Sélection des utilisateurs 
            const addUserQuery = 'SELECT * FROM users WHERE email = ? ';
            //binding des valeurs pour éviter les injections
            const values = [email]
            //execution de la query
            db.query(addUserQuery, values, async (err, results) => {
                try {
                    //Si l'utilisateur n'a pas été trouvé, envoie d'une erreur
                    if (!results || results.length === 0) {
                        throw new Error('User not found');
                    }
                    //récupération du mot de passe
                    const hashedPasswordFromDatabase = results[0].password;
                    //vérification du mot de passe
                    const match = await bcrypt.compare(password, hashedPasswordFromDatabase);
                    //En cas de mot de passe incorrect, renvoie d'une erreur
                    if (!match) {
                        throw new Error('Password does not match');
                    }
                    //sinon, résolution et envoi de l'Id  
                    resolve(results[0].id);
                } catch (error) {
                    reject(error.message)
                }
            });
        });
    });
}

module.exports = logIn