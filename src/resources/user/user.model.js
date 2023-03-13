const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    settings: {
      avatar: {
        type: String,
        default:
          'https://api.dicebear.com/5.x/identicon/svg?seed=solobachi02-gqk9o-gmail-1tqao-com&size=200&radius=50',
      },
      theme: {
        type: String,
        required: true,
        default: 'dark',
      },
      notifications: {
        type: Boolean,
        required: true,
        default: true,
      },
      compactMode: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now()) } }
)

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err)
    }

    this.password = hash
    next()
  })
})

userChema.methods.checkPassword = function (password) {
  const passwordHash = this.password
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err)
      }

      resolve(same)
    })
  })
}
const userModel = mongoose.model('user', userSchema)
module.exports = userModel
