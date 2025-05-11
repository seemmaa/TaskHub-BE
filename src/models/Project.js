const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  startingDate: String,
  endingDate: String,
  status: String,
  progress: Number,
  students: [String], // make it an array
});

module.exports = mongoose.model('Project', ProjectSchema);
