const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

module.exports = async ({ req }) => {
  const authHeader = req.headers.authorization;
  console.log('Authorization Header:', authHeader); // Debugging

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Authorization header missing or malformed');
    return { user: null };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded); // Debugging

    const user = await User.findById(decoded.id || decoded._id);
    if (!user) {
      console.error('User not found for the provided token');
      return { user: null };
    }

    console.log('Authenticated User:', user); // gingDebug
    return { user };
  } catch (err) {
    console.error('Error verifying token:', err.message);
    return { user: null };
  }
};