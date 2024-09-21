const Timetable = require('../models/timeTableModel');
const Course = require('../models/courseModel');
const mongoose = require('mongoose');
const Notification = require('../models/notificationModel');
const userNotificationController = require('./userNotificationController');

// Get all timetables
const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find({});
    res.status(200).json(timetables);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single timetable by ID
const getTimetableById = async (req, res) => {
  const { id } = req.params;
  try {
    const timetable = await Timetable.findById(id);
    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }
    res.status(200).json(timetable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new timetable
const createTimetable = async (req, res) => {
  const { C_name, day, startTime, endTime, faculty, location } = req.body;

  try {
    // Check if the provided C_name exists in the courses collection
    const existingCourse = await Course.findOne({ C_name });
    if (!existingCourse) {
      return res.status(400).json({ error: 'Invalid course name. Course not found.' });
    }


  // Check for overlaps based on day, time span, and faculty
  const overlappingTimetable = await Timetable.findOne({
    day,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
    faculty,
  });

  if (overlappingTimetable) {
    return res.status(400).json({ error: 'Overlap detected. Timetable already exists for the given time and faculty.' });
  }

  // Check for overlaps based on day, time span, and location
  const overlappingLocationTimetable = await Timetable.findOne({
    day,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
    location,
  });

  if (overlappingLocationTimetable) {
    return res.status(400).json({ error: 'Overlap detected. Timetable already exists for the given time and location.' });
  }

    // Create a new timetable
    const newTimetable = await Timetable.create({ C_name, day, startTime, endTime, faculty, location });
    res.status(201).json(newTimetable);

    // Create a new notification
    const newNotification = await Notification.create({
      C_name,
      day,
      startTime,
      endTime,
      faculty,
      location,
      changes: 'all' // Set changes property to "all"
    });

     // Call assignNotificationsToUsers function
     await userNotificationController.assignNotificationsToUsers(newNotification);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//Update timetables by ID

const updateTimetableById = async (req, res) => {
  const { id } = req.params;
  const { C_name, day, startTime, endTime, faculty, location } = req.body;

  try {
    // Check if the provided C_name exists in the courses collection
    const existingCourse = await Course.findOne({ C_name });
    if (!existingCourse) {
      return res.status(400).json({ error: 'Invalid course name. Course not found.' });
    }

    // Retrieve the existing timetable
    const existingTimetable = await Timetable.findById(id);
    if (!existingTimetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }

    // Compare existing timetable with updated timetable to identify changed fields
    const changes = {};
    if (C_name !== existingTimetable.C_name) changes.C_name = C_name;
    if (day !== existingTimetable.day) changes.day = day;
    if (new Date(startTime).toISOString() !== new Date(existingTimetable.startTime).toISOString()) changes.startTime = startTime;
    if (new Date(endTime).toISOString() !== new Date(existingTimetable.endTime).toISOString()) changes.endTime = endTime;
    if (faculty !== existingTimetable.faculty) changes.faculty = faculty;
    if (location !== existingTimetable.location) changes.location = location;

    // Update the timetable
    const updatedTimetable = await Timetable.findByIdAndUpdate(id, { $set: { ...changes } }, { new: true });

    // Create a new notification document with the changed field names
    const changedFieldNames = Object.keys(changes).join(', ');
    const newNotification = await Notification.create({
      C_name: updatedTimetable.C_name,
      day: updatedTimetable.day,
      startTime: updatedTimetable.startTime,
      endTime: updatedTimetable.endTime,
      faculty: updatedTimetable.faculty,
      location: updatedTimetable.location,
      changes: changedFieldNames
    });

    // Call assignNotificationsToUsers function
    await userNotificationController.assignNotificationsToUsers(newNotification);

    res.status(200).json(updatedTimetable);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Delete a timetable by ID
const deleteTimetableById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTimetable = await Timetable.findByIdAndDelete(id);
    if (!deletedTimetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }
    res.status(200).json({ message: 'Timetable deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTimetables,
  getTimetableById,
  createTimetable,
  updateTimetableById,
  deleteTimetableById,
};
