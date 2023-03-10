/*
NOTE: the term "chat" and "post" maybe used interchangeably in this code snipppet
This code snippet is written as a generic controller for all the models aside the user mode;
*/

//get all chats or comments
const fetchMany = (model) => async (req, res) => {
  try {
    const chatDocument = await model.find({})
    return res.status(200).json({ data: chatDocument })
  } catch (e) {
    console.log(e)
  }
}

//get a single chat orcomment
const fetchOne = (model) => async (req, res) => {
  //assign an id to target the routers id
  const id = req.params.id
  try {
    const chatDocument = await model.findOne({ _id: id })
    //if chat does not exist
    if (!chatDocument) {
      return res.status(404).end()
    }
    //if it the chat exists
    return res.status(200).json({ data: chatDocument })
  } catch (e) {
    res.json(e.message)
  }
}

//create a single chat or comment
const createOne = (model) => async (req, res) => {
  try {
    const chatDocument = await model.create({ ...req.body })
    if (chatDocument) {
      return res.json({ message: 'already created' })
    }
    return res.status(200).json({ data: chatDocument })
  } catch (e) {
    res.status(500).json({ message: 'not found' })
  }
}

//update a single post
const updateOne = (model) => async (req, res) => {
  const id = req.params.id
  try {
    const chatDocument = await model.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    })
    if (!chatDocument) {
      return res.status(400).end()
    }
    return res.status(200).json({ data: chatDocument })
  } catch (e) {
    console.log(e)
    res.json(e.message)
  }
}

//delete a single post
const deleteOne = (model) => async (req, res) => {
  const id = req.params.id
  try {
    const chatDocument = await model.findOneAndRemove({ _id: id })
    //if the document does not exist
    if (!chatDocument) {
      return res.status(400).end()
    }
    return res.status(200).json({ data: chatDocument })
  } catch (e) {
    res.json(e.message)
  }
}

exports.controllers = (model) => ({
  fetchOne: fetchOne(),
  fetchMany: fetchMany(),
  updateOne: updateOne(),
  deleteOne: deleteOne(),
  createOne: createOne(),
})
