//for the API with the endpoint / and /:id end points
//This a generic controller for all the models and routers
const chatModel = require('../resources/chats/chat.model')
const userModel = require('../resources/user/user.model')

//create a chat or post
const createOne = (model) => async (req, res) => {
  try {
    const chatDocument = await model.create({
      ...req.body,
      createdBy: req.user._id,
    })
    res.status(200).json({ data: chatDocument })
    const post = await userModel.findOne({ _id: chatDocument.createdBy })
    post.posts.unshift({
      _id: chatDocument._id,
    })
    chat.save()
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}
const fetchOne = (model) => async (req, res) => {
  try {
    const chatDocument = await model
      .findOne({
        _id: req.params.id,
        // username: 'okeychuk',
      })
      .populate('comments')

    if (!chatDocument) {
      return res.status(400).json({ message: 'chat does not exist!' })
    }
    res.status(200).json({ data: chatDocument })
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}
const fetchMany = (model) => async (req, res) => {
  try {
    const chatDocuments = await model.find({}).populate('comments')
    res.status(200).json({ data: chatDocuments })
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}

const updateOne = (model) => async (req, res) => {
  try {
    const updatedDocument = await model.findOneAndUpdate(
      { _id: req.params.id /* createdBy: req.chat._id */ },
      req.body,
      { new: true }
    )
    if (!updatedDocument) {
      return res.status(400).json({ message: 'no document found to update' })
    }
    res.status(200).json({ data: updatedDocument })
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}

const deleteOne = (model) => async (req, res) => {
  try {
    const removedChatDocument = await model.findOneAndRemove({
      _id: req.params.id,
      //   createdBy: req.chat._id,
    })
    if (!removedChatDocument) {
      return res
        .status(400)
        .json({ message: "couldn't retrieve chat for delete" })
    }
    res
      .status(200)
      .send({ data: removedChatDocument, message: `succesful deleted` })
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}

const createOneComment = (model) => async (req, res) => {
  const urlParams = req.params.id
  console.log(urlParams)
  try {
    const createdComment = await model.create({
      ...req.body,
      createdBy: req.params.id,
    })

    res.status(200).json({ data: createdComment })
    const chat = await chatModel.findOne({ _id: createdComment.createdBy })
    chat.comments.unshift({
      _id: createdComment._id,
    })
    chat.save()
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}
const fetchComments = (model) => async (req, res) => {
  const fetchedComment = await model.find({
    createdBy: req.params.id,
  })
  res.status(200).json({ data: fetchedComment })
}

const fetchOneComment = (model) => async (req, res) => {
  try {
    const fetchedComment = await model.findOne({
      _id: req.params.id,
    })
    res.status(200).json({ data: fetchedComment })
  } catch (e) {
    return res.status(400).end()
  }
}

exports.controllers = (model) => ({
  fetchOne: fetchOne(model),
  fetchMany: fetchMany(model),
  updateOne: updateOne(model),
  createOne: createOne(model),
  deleteOne: deleteOne(model),
  createOneComment: createOneComment(model),
  fetchComments: fetchComments(model),
  fetchOneComment: fetchOneComment(model),
})
