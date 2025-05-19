const { gql } = require('apollo-server-express');

module.exports = gql`

 type Message {
    id: ID!
    sender: String!
    receiver: String!
    text: String!
    timestamp: String!
  }
   
input MessageInput {
    sender: String!
    receiver: String!
    text: String!
    timestamp: String!
  }

  type Query {
    messages: [Message] # Fetch all messages, sorted by timestamp
    message(id: ID!): Message # Fetch a single message by ID
    messagesByReceiver(receiver: String!): [Message] # Fetch messages by receiver
    messagesBySender(sender: String!): [Message] # Fetch messages by sender
  }
  
  type Mutation {
     addMessage(input: MessageInput!): Message # Add a new message
    updateMessage(id: ID!, input: MessageInput!): Message # Update an existing message by ID
    deleteMessage(id: ID!): Message # Delete a message by ID

  }
  
 `;
  