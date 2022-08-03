//MongoDB Schema using mongoose

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notesSchema = new Schema({
  // userId: {
  //   type: ObjectId,
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('Note', notesSchema);