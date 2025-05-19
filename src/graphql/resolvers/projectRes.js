const Project = require('../../models/Project');
const User = require('../../models/User')
const Task = require('../../models/Task')

module.exports = {
  Query: {
    getProjects: async (_, __, context) => {
      console.log('Context:', context); // Debugging
      if (!context.user) throw new Error('Not authenticated');
      return await Project.find();
    },
    getDashboardStats: async (_, __, context) => {
      if (!context.user) throw new Error('Not authenticated');
      const totalProjects = await Project.countDocuments(); // ✅ counts all projects
      const finishedProjects = await Project.countDocuments({ status: "completed" }); // ✅ counts finished projects
      const students = await User.countDocuments({ role: "student" }); // ✅ counts students
      const tasks= await Task.countDocuments();
    
      return {
        projects: totalProjects,
        finishedProjects,
        students,
        tasks
      };
    
    
    },
    getProjectTasks: async (_, { projectName },context) => {
      try {
        if (!context.user) throw new Error('Not authenticated');
        const tasks = await Task.find({ project: projectName });
        return tasks;
      } catch (error) {
        console.error('Error fetching tasks:', error);
        throw new Error('Failed to get tasks for project');
      }
    },
    getProjectStudents: async (_, { projectName } ,context) => {
      if (!context.user) throw new Error('Not authenticated');
      const project = await Project.findOne({ title: projectName });

      if (!project) {
        throw new Error('Project not found');
      }
      const students= project.students[0].split(',');
      return students; // returns [String]
    },
    getprojectByStudent: async (_, { studentName },context) => {
      if (!context.user) throw new Error('Not authenticated');
      const project = await Project.find({ students: { $regex: studentName } });
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    }
  
  },

  Mutation: {
    addProject: async (_,{ input }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      const project = new Project(input);
      await project.save();
      return project;
    },
  },
};
