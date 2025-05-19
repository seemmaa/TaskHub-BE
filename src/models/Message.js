const mongoose = require('mongoose');

const Message = new mongoose.Schema({
  sender: 
  { 
    type: String, required: true
   }, // 'admin' أو 'user'
  receiver: 
  { 
    type: String, required: true
   }, // 'admin' أو 'user'
  text:
   {
     type: String, required: true
     },
  timestamp: 
  {  
  type: Date, default: Date.now
 },
});

module.exports = mongoose.model('Message', Message);