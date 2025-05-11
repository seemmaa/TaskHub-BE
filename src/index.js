require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const { typeDefs, resolvers } = require('./graphql');




const authMiddleware = require('./middleware/auth');


const cors = require('cors');

// Optional: Logging plugin for response logging
// const loggerPlugin = {
//   requestDidStart() {
//     return {
//       willSendResponse({ response }) {
//         console.log('📤 Response:', JSON.stringify(response.data, null, 2));
//       },
//     };
//   },
// };

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Apollo context function with logging
const context = async ({ req }) => {
  // console.log('📥 Incoming Request:');
  // console.log('Headers:', req.headers);

  // // Read request body (GraphQL query + variables)
  // let body = '';
  // req.on('data', chunk => {
  //   body += chunk.toString();
  // });
  // req.on('end', () => {
  //   if (body) {
  //     try {
  //       const parsed = JSON.parse(body);
  //       console.log('Body:', JSON.stringify(parsed, null, 2));
  //     } catch (err) {
  //       console.log('Could not parse request body:', err.message);
  //     }
  //   }
  // });

  // Auth context
  const auth = await authMiddleware({ req });

  return {
    ...auth,
    req,
  };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
 // plugins: [loggerPlugin],
});

// Start the server
async function start() {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(5000, () =>
    console.log(`🚀 Server running at http://localhost:5000${server.graphqlPath}`)
  );
}

start();
