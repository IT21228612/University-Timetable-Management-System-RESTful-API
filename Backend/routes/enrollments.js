const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');

// Import enrollment controller functions
const {
  getEnrollments,
  getEnrollmentByStudentId,
  createEnrollment,
  updateEnrollmentById,
  deleteEnrollmentById,
} = require('../controllers/enrollmentController');

// Apply authenticateUser middleware to routes that require authentication
router.use(authenticateUser);

// Middleware function to check if the user is authorized
const authorizeUser = (req, res, next) => {
  // Check if the user is logged in and has the required role
  if (!req.user || (req.user.accessLevel !== 'admin' && req.user.accessLevel !== 'faculty')) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
  // If the user is authorized, proceed to the next middleware function or route handler
  next();
};

// GET all enrollments (accessible only to admin and faculty)
router.get('/', authorizeUser, getEnrollments);

// GET enrollments by student ID (accessible only to admin and faculty)
router.get('/student/:studentId', authorizeUser, getEnrollmentByStudentId);

// POST create a new enrollment (accessible to all users)
router.post('/', createEnrollment);

// PUT update an enrollment by ID (accessible only to admin and faculty)
router.put('/:id', authorizeUser, updateEnrollmentById);

// DELETE an enrollment by ID (accessible only to admin and faculty)
router.delete('/:id', authorizeUser, deleteEnrollmentById);

module.exports = router;
