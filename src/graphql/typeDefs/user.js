const { gql } = require('apollo-server-express');

module.exports = gql`

  type User {
    id: ID!
    username: String!
    role: String!
    token: String
  }
type Query {
  me:User
  students:[String]!
  getUsers: [User]
}
 
 
  type Mutation {
    register(username: String!, password: String!, universityId:String): User
    login(username: String!, password: String!): User
   
  }
`;
