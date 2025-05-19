const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');

const userTypeDefs = require('./typeDefs/user');
const projectTypeDefs = require('./typeDefs/project');
const messageTypeDefs = require ('./typeDefs/message')
const taskTypeDefs = require('./typeDefs/task');

const userResolvers = require('./resolvers/user');
const projectResolvers = require('./resolvers/projectRes');
const MessageResoolvers= require('./resolvers/message');
const taskResolvers = require('./resolvers/taskRes');

const typeDefs = mergeTypeDefs([userTypeDefs, projectTypeDefs,messageTypeDefs,taskTypeDefs]);
const resolvers = mergeResolvers([userResolvers, projectResolvers,MessageResoolvers,taskResolvers]);

module.exports = {
  typeDefs,
  resolvers,
};
