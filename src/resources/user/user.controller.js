const User = require('./user.model')

exports.userDetails = (req, res) => {
  res.status(200).json({ data: req.user })
}

exports.updateUserDetails = async (req, res) => {
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
