const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: `${process.env.MYSQL_USER}`,
  password: `${process.env.MYSQL_PASSWORD}`,
  multipleStatements: true
});

const schemaPath = path.join(__dirname, 'schema.sql');
fs.readFile(schemaPath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading schema.sql:', err);
    return;
  }

  const createDatabaseQuery = `
    CREATE DATABASE IF NOT EXISTS hackathon;
    USE hackathon;
  `;

  connection.connect(connectErr => {
    if (connectErr) {
      console.error('Error connecting to the database:', connectErr);
      return;
    }

    console.log('Connected to the MySQL server.');

    connection.query(createDatabaseQuery, (dbErr) => {
      if (dbErr) {
        console.error('Error creating or selecting database:', dbErr.stack);
        connection.end();
        return;
      }

      console.log('Database created or selected successfully.');

      connection.query(data, (queryErr, results) => {
        if (queryErr) {
          console.error('Error executing schema creation query:', queryErr.stack);
          return;
        }

        console.log('Schema created successfully!');
      });

      connection.end();
    });
  });
});
