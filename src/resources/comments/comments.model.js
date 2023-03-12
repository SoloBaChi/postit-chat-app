const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'chat',
      //   required: true,
    },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now()) } }
)

const comment = mongoose.model('comment', commentSchema)

module.exports = comment
