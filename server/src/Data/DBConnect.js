const mysql = require('mysql2');

const connectToDatabase = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'technical_test',
    });

    connection.connect((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(connection);
    });
  });
};

export default connectToDatabase;
