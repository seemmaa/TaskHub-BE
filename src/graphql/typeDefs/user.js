const { gql } = require('apollo-server-express');

module.exports = gql`

  type User {
    id: ID!
    username: String!
    role: String!
    token: String
  }

     type AuthPayload {
    token: String!
   role: String!
   username: String!
    id: String!
   
  }
type Query {
  me:User
  students:[String]!
  getUsers: [User]
  getStudents:[User]
  getAdmins:[User]
}
 
 
  type Mutation {
    register(username: String!, password: String!, universityId:String): User
    login(username: String!, password: String!,staySignedIn: Boolean!):AuthPayload
   
  }
`;
