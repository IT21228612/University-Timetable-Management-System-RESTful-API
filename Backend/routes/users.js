const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticateUser = require('../middlewares/authenticateUser');

// Register a new user (accessible to all users)
router.post('/register', UserController.registerUser);

// Login user (accessible to all users)
router.post('/login', UserController.loginUser);

// Apply authenticateUser middleware to routes that require authentication
router.use(authenticateUser);

// Middleware function to check if the user is authorized as admin
const authorizeAdmin = (req, res, next) => {
  // Check if the user is logged in and has the admin role
  if (!req.user || req.user.accessLevel !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  // If the user is authorized as admin, proceed to the next middleware function or route handler
  next();
};

// Get all users (accessible only to admin)
router.get('/', authorizeAdmin, UserController.getUsers);

// Get user by ID (accessible only to admin)
router.get('/:id', authorizeAdmin, UserController.getUserById);

// Update user by ID (accessible only to admin)
router.put('/:id', authorizeAdmin, UserController.updateUserById);

// Delete user by ID (accessible only to admin)
router.delete('/:id', authorizeAdmin, UserController.deleteUserById);

// Change user's access level (accessible only to admin)
router.patch('/:id/access-level', authorizeAdmin, UserController.changeAccessLevel);

module.exports = router;
