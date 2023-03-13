const mongoose = require('mongoose')

const commentSchema = require('../comments/comments.model')

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comment',
      },
    ],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now()) } }
)

const chatModel = mongoose.model('chat', chatSchema)
module.exports = chatModel
