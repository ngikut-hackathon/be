// const fs = require('fs');
// const path = require('path');
// const { initiateConnection } = require('./connection');

// const schemaPath = path.join(__dirname, 'schema.sql');
// fs.readFile(schemaPath, 'utf-8', (err, data) => {
//   if (err) {
//     console.error('Error reading schema.sql:', err);
//     return;
//   }

//   const createDatabaseQuery = `
//     CREATE DATABASE IF NOT EXISTS hackathon;
//     USE hackathon;
//   `;

//   initiateConnection.connect(connectErr => {
//     if (connectErr) {
//       console.error('Error connecting to the database:', connectErr);
//       return;
//     }

//     console.log('Connected to the MySQL server.');

//     initiateConnection.query(createDatabaseQuery, (dbErr) => {
//       if (dbErr) {
//         console.error('Error creating or selecting database:', dbErr.stack);
//         initiateConnection.end();
//         return;
//       }

//       console.log('Database created or selected successfully.');

//       initiateConnection.query(data, (queryErr, results) => {
//         if (queryErr) {
//           console.error('Error executing schema creation query:', queryErr.stack);
//           return;
//         }

//         console.log('Schema created successfully!');
//       });

//       initiateConnection.end();
//     });
//   });
// });


const fs = require('fs').promises; // Menggunakan versi Promise dari fs
const path = require('path');
const { initiateConnection } = require('./connection');

const schemaPath = path.join(__dirname, 'schema.sql');

async function readSchemaFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    console.error('Error reading schema.sql:', error);
    throw error;
  }
}

async function setupDatabase(connection, schema) {
  const createDatabaseQuery = `
    CREATE DATABASE IF NOT EXISTS hackathon;
    USE hackathon;
  `;

  try {
    console.log('Connected to the MySQL server.');

    await connection.query(createDatabaseQuery);
    console.log('Database created or selected successfully.');

    await connection.query(schema);
    console.log('Schema created successfully!');
  } catch (error) {
    console.error('Error setting up the database:', error);
    throw error;
  }
}

async function initializeSchema() {
  let connection;
  try {
    connection = await initiateConnection;
    const schema = await readSchemaFile(schemaPath);
    await setupDatabase(connection, schema);
  } catch (error) {
    console.error('Error during database initialization:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed.');
    }
  }
}

initializeSchema();

