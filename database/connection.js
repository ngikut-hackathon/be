// const mysql = require('mysql2');
require('dotenv').config()
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});

const initiateConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
})

const createConnection = async () => {
    try {
    //   await connection.connect();
      console.log('Connected to the MySQL server.');
      return connection;
    } catch (error) {
      console.error('Error connecting to database:', error);
      throw error;
    }
  };

module.exports =
{
    connection,
    initiateConnection,
    createConnection
};