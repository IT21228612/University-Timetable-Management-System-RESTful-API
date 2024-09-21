const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const userNotificationController = require('../controllers/userNotificationController'); // Import the userNotificationController

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

// Get user notifications
router.get('/user-notifications', async (req, res) => {
    try {
        const userNotifications = await userNotificationController.getUserNotifications(req);
        res.status(200).json(userNotifications);
    } catch (error) {
        console.error('Error in getting user notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user notification read status
router.patch('/user-notifications/:id', async (req, res) => {
    try {
        const result = await userNotificationController.updateUserNotificationReadStatus(req);
        if (result.success) {
            res.status(200).json({ message: result.message });
        } else {
            res.status(404).json({ error: result.message });
        }
    } catch (error) {
        console.error('Error in updating user notification read status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;