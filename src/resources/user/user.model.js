const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
  },
  { timestamps: { currentTime: () => Math.floor(Date.now()) } }
)
