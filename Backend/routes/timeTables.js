const express = require('express');
const router = express.Router();
const timeTableController = require('../controllers/timeTableController');
const authenticateUser = require('../middlewares/authenticateUser');

// Apply authenticateUser middleware to routes that require authentication
router.use(authenticateUser);

// Middleware function to check if the user is authorized
const authorizeUser = (req, res, next) => {
  // Check if the user is logged in and has the required role
  if (!req.user || req.user.accessLevel !== 'admin') {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  // If the user is authorized, proceed to the next middleware function or route handler
  next();
};

// Get all timetables (accessible to all users)
router.get('/', timeTableController.getTimetables);

// Get a single timetable by ID (accessible to all users)
router.get('/:id', timeTableController.getTimetableById);

// Create a new timetable (accessible only to admins)
router.post('/', authorizeUser, timeTableController.createTimetable);

// Update a timetable by ID (accessible only to admins)
router.patch('/:id', authorizeUser, timeTableController.updateTimetableById);

// Delete a timetable by ID (accessible only to admins)
router.delete('/:id', authorizeUser, timeTableController.deleteTimetableById);

module.exports = router;
