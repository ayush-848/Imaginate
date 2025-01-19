const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userCredits: {
      type: Number,
      required: true,
      default: 5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
