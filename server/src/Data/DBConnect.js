const mysql = require('mysql2');

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'technical_test',
    });

    connection.connect((error) => {
      if (error) {
        reject(error.message)
        return;
      }

      resolve(connection);
    });
  });
};

export default connectToDatabase;
