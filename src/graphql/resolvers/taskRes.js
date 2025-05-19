// graphql/resolvers.js
const Task = require('../../models/Task');
const User = require('../../models/User');
const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: String,
  seq: Number,
});
const Counter = mongoose.model('Counter', CounterSchema);
const getNextSequence = async (name) => {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};

module.exports = {
  
  Query: {
    getAllTasks: async (_,__,context) =>{
      if (!context.user) throw new Error('Not authenticated');
    return await Task.find()},
    getTaskById: async (_,context, { taskId }) =>{
      if (!context.user) throw new Error('Not authenticated'); 
      return await Task.findOne({ taskId })},
  },

  


  Mutation: {
    createTask: async (_, args,context) => {
      const {
        taskName,
        description,
        dueDate,
        assignedStudent,
        project,
        status
      } = args;
      if (!context.user) throw new Error('Not authenticated');
      const taskId = await getNextSequence('taskId'); // auto-increment taskId

      const newTask = new Task({
        taskId,
        taskName,
        description,
        dueDate,
        assignedStudent,
        project,
        status
      });

      return await newTask.save();
    },
  
  



    updateTask: async (_, { task },context) => {
      if (!context.user) throw new Error('Not authenticated');
      const updatedTask = await Task.findOneAndUpdate(
        { taskId: task.taskId },
        task,
        { new: true }
      );
      return updatedTask;
    },

    deleteTask: async (_,{ taskId }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      await Task.findOneAndDelete({ taskId });
      return `Task with ID ${taskId} deleted`;
    },
  },
};
