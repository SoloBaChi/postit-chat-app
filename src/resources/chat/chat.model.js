const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})

const chatSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    comments: [commentSchema],
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
)

const chatModel = mongoose.model('chat', chatSchema)
module.exports = chatModel
