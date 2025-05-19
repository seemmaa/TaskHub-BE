// require('dotenv').config();
// const express = require('express');
// const { ApolloServer } = require('apollo-server-express');
// const connectDB = require('./config/db');
// const { typeDefs, resolvers } = require('./graphql');
// const { WebSocketServer } = require('ws');
// const http = require('http');
// const { PubSub } = require('graphql-subscriptions');
// const { useServer } = require('graphql-ws/use/ws');

// const { makeExecutableSchema } = require('@graphql-tools/schema');
// const authMiddleware = require('./middleware/auth');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { expressMiddleware: apolloExpressMiddleware } = require('@apollo/server/express4');



// // Set up PubSub instance
// const pubsub = new PubSub();

// async function startServer() {
//   // Connect to MongoDB
//   await connectDB();

//   const app = express();
//   app.use(cors());

//   const httpServer = http.createServer(app);

//   // Create schema
//   const schema = makeExecutableSchema({ typeDefs, resolvers });

//   // Create WebSocket server for GraphQL subscriptions
//   const wsServer = new WebSocketServer({
//     server: httpServer,
//     path: "/graphql",
//   });

//   // Set up context for WebSocket connections
//   useServer(
//     {
//       schema,
//       context: async (ctx) => {
//         const req = ctx.extra.request;
//         const { user } = await authMiddleware({ req });
//         console.log("WebSocket Context User:", user);
//         return { user, pubsub };
//       },
//     },
//     wsServer
//   );

//   // Create ApolloServer for HTTP
//   const server = new ApolloServer({
//     schema,
//     context: async ({ req }) => {
//       const { user } = await authMiddleware({ req });
//       console.log("HTTP Context User:", user);
//       return { user, pubsub };
//     },
//   });

//   await server.start();

//   app.use(
//     "/graphql",
//     bodyParser.json(),
//     apolloExpressMiddleware(server)
//   );

//   const PORT = 5000;
//   httpServer.listen(PORT, () => {
//     console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
//     console.log(`📡 Subscriptions ready at ws://localhost:${PORT}/graphql`);
//   });

//   // Optional: send a test message 5 seconds after startup
//   setTimeout(() => {
//     pubsub.publish("NEW_MESSAGE", {
//       newMessage: {
//         id: "test123",
//         content: "Test message",
//         receiver: { _id: "user123", name: "Admin" },
//         timestamp: new Date().toISOString(),
//       },
//     });
//     console.log("✅ Published test message to NEW_MESSAGE subscription");
//   }, 5000);
// }

// startServer();
