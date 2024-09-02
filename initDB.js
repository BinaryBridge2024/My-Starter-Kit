const pool = require('./config/database');

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

pool.query(createUsersTable)
    .then((res) => {
        console.log('Users table created successfully');
        pool.end(); // Close the database connection
    })
    .catch((err) => {
        console.error('Error creating users table', err);
        pool.end();
    });
