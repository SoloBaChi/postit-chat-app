const User = require('./user.model')
const generateRandomAvatar = require('../data/generate.avatar')

const userDetails = (req, res) => {
  res.status(200).json({ data: req.user })
}

const updateUserDetails = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
    res.status(200).json({ data: user })
  } catch (e) {
    console.log(e)
    res.status(404).end()
  }
}

// const createAvatarStyle = async (req, res) => {
//   try {
//     const avatarImage =
//   } catch (e) {
//     console.log(e.message)
//     res.status(400).end()
//   }
// }

//exporting the controllers
exports.userControllers = {
  userDetails: userDetails,
  updateUserDetails: updateUserDetails,
}
