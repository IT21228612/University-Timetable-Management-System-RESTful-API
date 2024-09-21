const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
  // Extract the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {

    
    // Verify the token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log('Received Token:', token);
    console.log('Decoded Token:', decoded);
    // Check if the decoded token contains a userId
    if (!decoded.userId) {
      return res.status(401).json({ error: 'Unauthorized: Invalid tokenn' });
    }
    // Fetch the user from the database based on the userId in the token
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized: User not found' });
    }
    // Set req.user with the authenticated user's data
    req.user = user;
    // Proceed to the next middleware function or route handler
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid tokennnn' });
  }
};

module.exports = authenticateUser;
