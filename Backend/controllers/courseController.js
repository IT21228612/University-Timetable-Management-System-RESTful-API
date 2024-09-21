const Course = require('../models/courseModel');
const mongoose = require('mongoose');

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error); // Log the error message
    res.status(400).json({ error: error.message });
  }
};

// Get a single course
const getCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid course ID' });
  }

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  const { C_name, C_code, C_description, C_credits, C_faculty } = req.body;

  try {
    const course = await Course.create({ 
      C_name, 
      C_code, 
      C_description, 
      C_credits, 
      C_faculty 
    });
    res.status(201).json(course);
  } catch (error) {
    console.error('Error fetching courses:', error); // Log the error message
    res.status(400).json({ error: error.message });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid course ID' });
  }

  try {
    const course = await Course.findOneAndDelete({ _id: id });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a course
const updateCourse = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid course ID' });
  }

  try {
    const course = await Course.findByIdAndUpdate(id, req.body, { new: true });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update the C_faculty property in a course
const updateCourseFaculty = async (req, res) => {
  const { id } = req.params;
  const { C_faculty } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid course ID' });
  }

  try {
    const course = await Course.findByIdAndUpdate(id, { C_faculty }, { new: true });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Export functions
module.exports = {
  getCourses,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse,
  updateCourseFaculty
};
