// // ` import mysql2 module promise wrapper
// const mysql = require('mysql2/promise');


// // `  prepare the db parameters
// const dbConfig = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password:  process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: 10,

  
// };
// async function testConnection() {
//     try {
//       const connection = await pool.getConnection();
//       console.log('Connected to the database successfully.');
//       connection.release();
//     } catch (err) {
//       console.error('Unable to connect to the database:', err.message);
//       process.exit(1); // Exit the process with a failure code
//     }
//   }
// // console.log(process.env.DB_USER);
// //` create the connection pool

// // Log environment variables (do not log passwords in production)

// // console.log("DB Config - User:", process.env.DB_USER);
// // console.log("DB Config - Database:", process.env.DB_NAME);
// // console.log("DB Config - Password:", process.env.DB_PASSWORD);
// // console.log("DB Config - Port:", process.env.PORT);
// // console.log("DB Config - Port:", process.env.DB_HOST);


// const pool =  mysql.createPool(dbConfig);

// // ` prepare a function that will execute the sql queries asynchronously

// // Function to execute SQL queries asynchronously
// async function query(sql, params) {
//     try {
//         // Execute the query and destructure the result into rows and fields
//         const [rows] = await pool.execute(sql, params);

//         // Return an object containing both rows and fields
//         return { rows };
//     } catch (error) {
//         console.error('Error executing query:', error);
//         throw error; // Throw error for the caller to handle
//     }
// }
// testConnection()
// // ` export the function 
// module.exports = {
//     query
// }


// ===========================


// Load environment variables from .env file
require('dotenv').config();

// Log environment variables (do not log passwords in production)
console.log("DB Config - Host:", process.env.DB_HOST);
console.log("DB Config - User:", process.env.DB_USER);
console.log("DB Config - Database:", process.env.DB_NAME);
console.log("DB Config - Password:", process.env.DB_PASSWORD);

// Import mysql2 promise wrapper
const mysql = require('mysql2/promise');

// Prepare the db parameters
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Use DB_PASSWORD to match .env variable
  database: process.env.DB_NAME,
  connectionLimit: 10,

//   PLEASE DONT DELETE THIS. COMMENT OUT 
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
};

// Create the connection pool
const pool = mysql.createPool(dbConfig);

// Function to test the connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the database successfully.');
        connection.release();
    } catch (err) {
        console.error('Unable to connect to the database:', err.message);
        process.exit(1); // Exit the process with a failure code
    }
}

// Function to execute SQL queries asynchronously
async function query(sql, params) {
    try {

        // Execute the query and destructure the result into rows and fields
        const [rows, fields] = await pool.execute(sql, params);

        // Log the query results for debugging
        console.log('Query result:', rows);
        
        // Return an object containing both rows and fields
        return rows;

    } catch (error) {
        console.error('Error executing query:', error);
        throw error; // Throw error for the caller to handle
    }
}

// Test the connection
testConnection();

// Export the query function
module.exports = {
    query
};
