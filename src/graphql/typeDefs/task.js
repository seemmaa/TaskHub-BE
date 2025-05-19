// graphql/typeDefs.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  type Task {
    taskId:  String!
    project: String!
    taskName: String!
    description: String
    dueDate: String
    assignedStudent: String
    status: String
  }

  type Query {
    getAllTasks: [Task]
    getTaskById(taskId: String!): Task
  }

  input TaskInput {
    taskId: String!
    project: String!
    taskName: String!
    description: String
    dueDate: String
    assignedStudent: String
    status: String
  }

  input UpdateTaskInput {
    taskId: String!
    project: String
    taskName: String
    description: String
    dueDate: String
    assignedStudent: String
    status: String
  }

  type Mutation {
    createTask(taskName:String!, project:String!, description:String!, dueDate:String!
    ,status:String!,assignedStudent:String!): Task
    updateTask(task: UpdateTaskInput!): Task
    deleteTask(taskId: String!): String
  }
`;
