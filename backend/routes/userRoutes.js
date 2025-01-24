const express = require('express');
const router = express.Router();
const authenticated = require('../middlewares/authenticated');
const Chat=require('../models/chatModel')
const chats = async (req, res) => {
  try {
    // Fetch chats for the authenticated user
    const userChats = await Chat.find({ userId: req.user._id }).sort({ timestamp: -1 }); // Sort by latest first

    if (!userChats || userChats.length === 0) {
      return res.status(404).json({ success: false, message: 'No chats found' });
    }

    res.status(200).json({
      success: true,
      message: 'Chats retrieved successfully',
      chats: userChats,
    });
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chats',
      error: error.message,
    });
  }
};

router.get('/chats', authenticated, chats);

module.exports = router;
