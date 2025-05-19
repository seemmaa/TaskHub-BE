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
  type Task {
    taskId: String!
    project: String!
    taskName: String!
    description: String
    dueDate: String
    assignedStudent: String
    status: String
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
    tasks: Int!
}

  type Query {
    getProjects: [Project]
     getDashboardStats: DashboardStats!
    getProjectTasks(projectName: String!): [Task]
    getProjectStudents(projectName: String!): [String!]!
    getprojectByStudent(studentName: String!): [Project]
  }

  type Mutation {
    addProject(input: ProjectInput): Project
  }
`;
