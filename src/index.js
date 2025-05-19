require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const { typeDefs, resolvers } = require('./graphql');
const { WebSocketServer } = require('ws');
const http = require('http');
//const  pubsub = require('./lib/pubsub');
const { useServer } = require('graphql-ws/use/ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const authMiddleware = require('./middleware/auth');
const cors = require('cors');
const bodyParser = require('body-parser');
const { expressMiddleware: apolloExpressMiddleware } = require('@apollo/server/express4');
const { Server } = require('socket.io');
const Message = require('./models/Message'); // Import your Message model





// Create GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Initialize Express app
const app = express();
app.use(cors());

// Create HTTP server
const httpServer = http.createServer(app);


// Connect to MongoDB
connectDB();

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    const  user = await authMiddleware({ req });
    
    return {
      ...user,
      io, 
    };
  },
});


const io = new Server(httpServer, {
  path: "/socket.io",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Socket.io logic

io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Join a room based on user ID for targeted messaging
  socket.on('joinUserRoom', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('addMessage', async (data) => {
    const { from, to, content,recId } = data;
    console.log(`Message from ${from} to ${to}: ${content}`);
    io.to(data.receiverId).emit('addMessage', data); // Targeted emit
  io.to(data.senderId).emit('addMessage', data); // Also send back to sender

    const message = new Message({
      sender:from,
      receiver:to,
      text: content,
      timestamp: Date.now(),
    });

    await message.save();

    // Emit to sender and receiver only
   // io.to(from).emit('receiveMessage', message);
    io.to(recId).emit('receiveMessage', message);
  });

  socket.on('disconnect', (reason) => {
    console.log(`❌  disconnected: ${reason}`);
  });

  socket.on('error', (err) => {
    console.error(`Socket error for ${socket.user.username}:`, err);
  });
});
// Start the server
async function start() {
  await server.start();
  server.applyMiddleware({ 
    app,
    cors: false 
  });

  const PORT = process.env.PORT || 5000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`📡 Subscriptions ready at ws://localhost:${PORT}/graphql`);
  });
}

start().catch(err => {
  console.error('Server startup error:', err);
  process.exit(1);
});