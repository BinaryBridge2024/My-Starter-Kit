const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const userController = require('../controllers/userController');
router.post('/register', userController.registerUser);
router.post('/register', registerUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
