const User = require('./user.model')
const generateRandomAvatar = require('../data/generate.avatar')

//creating a user account
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

const deleteOne = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndRemove({ _id: req.params.id })
    if (!deletedUser) {
      res
        .status(404)
        .json({ message: `the user with ${req.params.is} is not found` })
      res
        .status(200)
        .json({ data: deletedUser, message: 'user successful deleted' })
    }
  } catch (e) {
    console.log(e.message)
    res.status(404).end()
  }
}

//fetching a user,users , users with an id ad their comments e.t.c
const fetchOne = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    }).populate('posts')
    if (!user) {
      res
        .status(404)
        .json({ message: `user with ${req.params.id} does not exist` })
    }
    res.status(200).json({ data: user })
  } catch (e) {
    console.log(e.message)
    res.status(400).end()
  }
}

const fetchMany = async (req, res) => {
  try {
    const users = await User.find({}).populate('posts')
    if (!users) {
      res.status(404).json({ message: 'no existing users for now' })
    }
    res.status(200).json({ data: users })
  } catch (e) {
    console.log(e.message)
  }
}
const fetchChatWithManyComments = async () => {
  try {
    const user = await User.findOne({})
    if (!user) {
      res
        .status(404)
        .json({ message: `user with ${req.params.id} does not exist` })
    }
    res.status(200).json({ data: user })
  } catch (e) {
    console.log(e.message)
    res.status(400).end()
  }
}

const fetchChatWithOneComment = async () => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
    })
    if (!user) {
      res
        .status(404)
        .json({ message: `user with ${req.params.id} does not exist` })
    }
    res.status(200).json({ data: user })
  } catch (e) {
    console.log(e.message)
    res.status(400).end()
  }
}

//exporting the controllers
exports.userControllers = {
  userDetails: userDetails,
  updateUserDetails: updateUserDetails,
  fetchOne: fetchOne,
  fetchMany: fetchMany,
  fetchChatWithManyComments: fetchChatWithManyComments,
  fetchChatWithOneComment: fetchChatWithOneComment,
  deleteOne: deleteOne,
}
