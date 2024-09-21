const mongoose = require('mongoose');

const Enrollment = require('../models/enrollmentModel');

// Get all enrollments
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({});
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get enrollment by student ID
const getEnrollmentByStudentId = async (req, res) => {
  const { studentId } = req.params;
  try {
    const enrollments = await Enrollment.find({ S_Id: studentId });
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new enrollment
const createEnrollment = async (req, res) => {
  const { S_Id, C_code } = req.body;
  try {
    const newEnrollment = await Enrollment.create({ S_Id, C_code });
    res.status(201).json(newEnrollment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete enrollment by ID
const deleteEnrollmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEnrollment = await Enrollment.findByIdAndDelete(id);
    if (!deletedEnrollment) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    res.status(200).json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Update enrollment by ID
const updateEnrollmentById = async (req, res) => {
    const { id } = req.params;
    const { S_Id, C_code } = req.body;
    try {
      // Find the enrollment by ID and update its fields
      const updatedEnrollment = await Enrollment.findByIdAndUpdate(
        id,
        { S_Id, C_code },
        { new: true }
      );
      if (!updatedEnrollment) {
        return res.status(404).json({ error: 'Enrollment not found' });
      }
      res.status(200).json(updatedEnrollment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  module.exports = {
    getEnrollments,
    getEnrollmentByStudentId,
    createEnrollment,
    updateEnrollmentById,
    deleteEnrollmentById,
  };