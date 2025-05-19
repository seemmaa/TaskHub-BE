const User = require('../models/User');

// Constants for error messages
const ERROR_MESSAGES = {
  MISSING_FIELDS: 'All fields are required.',
  USERNAME_EXISTS: 'Username already exists.',
  USER_NOT_FOUND: 'User not found.',
  INVALID_CREDENTIALS: 'Invalid credentials.',
  SIGNUP_FAILED: 'Signup failed.',
  SIGNIN_FAILED: 'Signin failed.',
};

const authResolvers = {
  Mutation: {
    // Sign-up mutation
    signup: async (_, { username, password, role }) => {
      try {
        // Validate input
        if (!username || !password || !role) {
          throw new Error(ERROR_MESSAGES.MISSING_FIELDS);
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error(ERROR_MESSAGES.USERNAME_EXISTS);
        }

        // Create and save the user (password is hashed automatically by the pre-save hook)
        const user = new User({ username, password, role });
        await user.save();

        // Generate a JWT token
        const token = user.generateAuthToken();

        // Return the token and user data
        return { token, user };
      } catch (error) {
        console.error('Signup error:', error.message); // Log the error
        throw new Error(`${ERROR_MESSAGES.SIGNUP_FAILED} ${error.message}`);
      }
    },

    // Sign-in mutation
    signin: async (_, { username, password ,staySignedIn}) => {
      try {
        // Validate input
        if (!username || !password) {
          throw new Error(ERROR_MESSAGES.MISSING_FIELDS);
        }

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        // Generate a JWT token
        const expiresIn = staySignedIn ? '30d' : '1h';

        // Manually generate the token with expiration
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn });

        // Return the token and user data
        return { token, user };
      } catch (error) {
        console.error('Signin error:', error.message); // Log the error
        throw new Error(`${ERROR_MESSAGES.SIGNIN_FAILED} ${error.message}`);
      }
    
    },
  },
};

module.exports = authResolvers;