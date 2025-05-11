const { gql } = require('apollo-server-express');

module.exports = gql`
  type Project {
    id: ID!
    title: String!
    description: String!
    category: String!
    startingDate: String!
    endingDate: String!
    status: String!
    progress: Int!
    students: [String]!
  }

  input ProjectInput {
    title: String!
    description: String!
    category: String!
    startingDate: String!
    endingDate: String!
    status: String!
    progress: Int!
    students: [String]!
  }

  type DashboardStats {
 projects: Int!
    students: Int!
   
    finishedProjects: Int!
}

  type Query {
    getProjects: [Project]
     getDashboardStats: DashboardStats!
  }

  type Mutation {
    addProject(input: ProjectInput): Project
  }
`;
