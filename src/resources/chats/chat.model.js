const mongoose = require('mongoose')

const commentSchema = require('../comments/comments.model')

const chatSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comment',
      },
    ],
  },
  { timestamps: { currentTime: () => Math.floor(Date.now()) } }
)

const chatModel = mongoose.model('chat', chatSchema)
module.exports = chatModel
