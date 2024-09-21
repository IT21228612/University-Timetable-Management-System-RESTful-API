require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const courseRoutes = require('./routes/courses');
const timeTableRoutes = require('./routes/timeTables');
const enrollmentRoutes = require('./routes/enrollments');
const userRoutes = require('./routes/users');
const notificationRoutes = require('./routes/notifications');

// Create express app
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start listening for requests after connecting to MongoDB
    app.listen(process.env.PORT, () => {
      console.log('Server is running on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/timetables', timeTableRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

module.exports = app;
