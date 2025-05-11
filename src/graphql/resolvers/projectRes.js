const Project = require('../../models/Project');
const User = require('../../models/User')

module.exports = {
  Query: {
    getProjects: async () => {
      return await Project.find();
    },
    getDashboardStats: async () => {
      const totalProjects = await Project.countDocuments(); // ✅ counts all projects
      const finishedProjects = await Project.countDocuments({ status: "completed" }); // ✅ counts finished projects
      const students = await User.countDocuments({ role: "student" }); // ✅ counts students
    
      return {
        projects: totalProjects,
        finishedProjects,
        students
      };
    
    
    },
  },

  Mutation: {
    addProject: async (_, { input }) => {
      const project = new Project(input);
      await project.save();
      return project;
    },
  },
};
