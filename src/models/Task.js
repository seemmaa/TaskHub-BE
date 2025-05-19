// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true },
  project: { type: String, required: true },
  taskName: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  assignedStudent: { type: String },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed','Canceled','On Hold'], default: 'Pending' }
});

module.exports = mongoose.model('Task', TaskSchema);
