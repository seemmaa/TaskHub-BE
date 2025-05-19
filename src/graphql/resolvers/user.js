const User = require('../../models/User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign(
    { id: user._id.toString(), username: user.username, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1d' }
  );
};

module.exports = {
  Query: {
    me: (_, __, { req }) => {
     // if (!req.isAuth) throw new Error("Not authenticated");
      return User.findById(req.userId);
    },
    students: async () => {

      const students = await User.find({ role: 'student' }, 'username');
      return students.map(user => user.username);
    },
    getUsers: async () => {
          return await User.find();
        },
    getStudents: async () => {
      const students = await User.find({ role: 'student' });
      return students;
    },
    getAdmins: async () => {
      const admins = await User.find({ role: 'admin' });
      return admins;
    }
  

  },
  Mutation: {
    register: async (_, { username, password, universityId }) => {
      const existing = await User.findOne({ username });
      if (existing) throw new Error('Username already taken');
      
      // Hash password before saving
     // const hashedPassword = await bcrypt.hash(password, 10);
      
      const role = universityId ? 'student' : 'admin';
      const user = await new User({ 
        username, 
        password ,
        universityId, 
        role 
      }).save();
      
      return {
        id: user._id.toString(),
        username: user.username,
        role: user.role,
        token: generateToken(user)
      };
    },
    
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');
      console.log("password",password,"hashed",user.password);
      
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error('Invalid credentials');
      
      return {
        id: user._id.toString(),
        username: user.username,
        role: user.role,
        token: generateToken(user)
        
      };
    }
  }
};