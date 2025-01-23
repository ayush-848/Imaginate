const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: { type: String, required: true },  // The user's prompt
  result: { type: String, required: true },  // The result of the successful prompt
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failure'], required: true },
  imageUrl: { type: String }  // New field to store the Imgur URL of the image
});

module.exports = mongoose.model('Chat', chatSchema);
