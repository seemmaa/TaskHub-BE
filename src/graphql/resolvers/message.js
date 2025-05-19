const  pubsub = require('../../lib/pubsub'); 
const Message = require('../../models/Message');



const MESSAGE_ADDED = 'MESSAGE_ADDED';

const message = {
  Query: {
    messages: async (_,__,context) => {
      if (!context.user) throw new Error('Not authenticated');
      return await Message.find().sort({ timestamp: 1 });
    },
    message: async (_, context,{ id }) => {
      if (!context.user) throw new Error('Not authenticated');
      const message = await Message.findById(id);
      if (!message) throw new Error('Message not found');
      return message;
    },
    messagesByReceiver: async (_, { receiver },context) => {
      if (!context.user) throw new Error('Not authenticated');
      const messages = await Message.find({ receiver }).sort({ timestamp: 1 });
      return messages;
    }
  },

  Mutation: {
    addMessage: async (_,{ input }, { user,io } , context) => {
      if (!context.user) throw new Error('Not authenticated');
      if (!user) throw new Error('Authentication required');
      const newMessage = new Message({
        ...input,
        from: user._id,
      });
      await newMessage.save();

      // Publish event
     io.emit("receiveMessage",newMessage); // this triggers the frontend socket.on

    // Also publish to GraphQL subscription if you're using Apollo
    pubsub.publish("MESSAGE_ADDED", {
      messageAdded:newMessage
    });

      return newMessage;
    },

    updateMessage: async (_, { id, input }, { user }) => {
      const message = await Message.findById(id);
      if (!message) throw new Error('Message not found');
      if (!message.from.equals(user._id) && user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      Object.assign(message, input);
      await message.save();
      return message;
    },

    deleteMessage: async (_, { id }, { user }) => {
      const message = await Message.findById(id);
      if (!message) throw new Error('Message not found');
      if (!message.from.equals(user._id) && user.role !== 'admin') {
        throw new Error('Unauthorized');
      }

      await message.deleteOne();
      return message;
    },
  },
  

};

module.exports = message;
