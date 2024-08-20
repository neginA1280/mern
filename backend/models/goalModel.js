const { text } = require('body-parser');
const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

// create a schema for the goals model
const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Goal', goalSchema);
