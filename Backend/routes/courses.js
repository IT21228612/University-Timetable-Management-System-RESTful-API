const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const { getCourses, 
  getCourse, 
  createCourse, 
  deleteCourse, 
  updateCourse, 
  updateCourseFaculty } = require('../controllers/courseController');

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

// Get all courses (accessible to all users)
router.get('/', getCourses);

// Get a single course (accessible to all users)
router.get('/:id', getCourse);

// Create a new course (accessible only to admins)
router.post('/', authorizeUser, createCourse);

// Delete a course (accessible only to admins)
router.delete('/:id', authorizeUser, deleteCourse);

// Update a course (accessible only to admins)
router.patch('/:id', authorizeUser, updateCourse);

// Update a course's faculty (accessible only to admins)
router.patch('/:id/update-faculty', authorizeUser, updateCourseFaculty);

module.exports = router;
