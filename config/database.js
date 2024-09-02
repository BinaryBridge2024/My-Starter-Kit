const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables from .env

// Set up a new pool instance using the connection string and SSL options
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // This allows self-signed certificates
  },
});

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = pool;

