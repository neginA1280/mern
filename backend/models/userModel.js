const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please fill out the name'],
    },
    email: {
      type: String,
      required: [true, 'Please fill out the email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please fill out the password'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
