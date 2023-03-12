const mongoose = require('mongoose')

const commentSchema = require('../comments/comments.model')

/*const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now()) } }
)*/

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
        type: mongoose.Schema.Types.ObjectId,
        ref: commentSchema,
      },
    ],
  },
  { timestamps: { currentTime: () => Math.floor(Date.now()) } }
)

const chatModel = mongoose.model('chat', chatSchema)
module.exports = chatModel
