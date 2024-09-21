const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');

// Function to register a new user
const registerUser = async (req, res) => {
  const { UserName, password,  name, email } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ UserName });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      UserName,
      password: hashedPassword,
      accessLevel: 'student',
      name,
      email
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' , user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Function to authenticate a user
const loginUser = async (req, res) => {
  const { UserName, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ UserName });
    if (!user) {
      return res.status(401).json({ error: 'Invalid User Name' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid Password' });
    }

    // Create and send JWT token
    const tokenPayload = {
        userId: user._id,
        username: user.UserName,
        accessLevel: user.accessLevel
      };
    
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    res.status(200).json({ message: 'Login successful' , token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get all users
const getUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get user by ID
  const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Update user by ID
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { UserName, password, accessLevel, name, email } = req.body;
  
    try {
      // Prevent updating certain fields
      if (req.body.UserName || req.body.salt || req.body.accessLevel) {
        return res.status(400).json({ error: 'Cannot update UserName, salt, or accessLevel' });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { password, name, email },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  
  // Delete user by ID
  const deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Change user's access level
const changeAccessLevel = async (req, res) => {
    const { id } = req.params;
    const { accessLevel } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { accessLevel },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  changeAccessLevel,
};
