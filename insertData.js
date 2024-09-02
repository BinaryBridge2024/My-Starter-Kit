const pool = require('./config/database'); // Make sure this path matches your setup

// Function to insert a new user
const insertUser = async (username, email, password) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3) RETURNING *;
  `;

  try {
    const res = await pool.query(query, [username, email, password]);
    console.log('User inserted:', res.rows[0]);
  } catch (err) {
    console.error('Error inserting user', err);
  } finally {
    pool.end(); // Close the database connection
  }
};

// Example usage
insertUser('Suleiman', 'suleimanalhaji612@gmail.com', '12345');
