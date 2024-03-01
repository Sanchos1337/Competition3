const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers
} = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', registerUser);

// Log in a user
router.post('/login', loginUser);

// Get user data
router.get('/me', requireAuth, getMe);

// Get all users
router.get('/', getUsers)


module.exports = router;