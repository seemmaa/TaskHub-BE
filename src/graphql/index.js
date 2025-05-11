const { mergeTypeDefs } = require('@graphql-tools/merge');
const { mergeResolvers } = require('@graphql-tools/merge');

const userTypeDefs = require('./typeDefs/user');
const projectTypeDefs = require('./typeDefs/project');

const userResolvers = require('./resolvers/user');
const projectResolvers = require('./resolvers/projectRes');

const typeDefs = mergeTypeDefs([userTypeDefs, projectTypeDefs]);
const resolvers = mergeResolvers([userResolvers, projectResolvers]);

module.exports = {
  typeDefs,
  resolvers,
};
