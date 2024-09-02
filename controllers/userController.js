const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const AppError = require('../utils/AppError'); // Import the custom error class

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        if (error.code === '23505') { // Unique constraint violation
            res.status(400).json({ error: 'Username or email already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};



// Function to get all users
const getAllUsers = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, username, email FROM users');
    res.json(result.rows);
  } catch (error) {
    next(new AppError('Internal server error', 500)); // Pass error to the global error handler
  }
};

// Function to get a user by ID
const getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }
    res.json(result.rows[0]);
  } catch (error) {
    next(new AppError('Internal server error', 500)); // Pass error to the global error handler
  }
};

// Function to update user information
const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const result = await pool.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [username, email, hashedPassword, id]
    );

    if (result.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(new AppError('Internal server error', 500)); // Pass error to the global error handler
  }
};

// Function to delete a user
const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return next(new AppError('User not found', 404));
    }

    res.json({
      message: 'User deleted successfully',
      user: result.rows[0],
    });
  } catch (error) {
    next(new AppError('Internal server error', 500)); // Pass error to the global error handler
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

