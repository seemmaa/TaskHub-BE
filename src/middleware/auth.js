// context.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = ({ req }) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return { user };
    } catch (err) {
      throw new Error('Invalid or expired token');
    }
  }
  return {};
};
