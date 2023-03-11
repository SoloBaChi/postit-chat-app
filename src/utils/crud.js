/*This is generic controller code written for all the models aside the user model
 */
const fetchOne = (model) => async (req, res) => {
  try {
    const chatDocument = await model.findOne({ _id: req.params.id })
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
    const chatDocuments = await model.find({})
    res.status(200).json({ data: chatDocuments })
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}
const createOne = (model) => async (req, res) => {
  try {
  const chatDocument = await model.create({...req.body})
  res.status(200).json({data:chatDocument})
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}
const updateOne = (model) => async (req, res) => {
  try {
    const updatedDocument = await model.findOneAndUpdate(
      { _id: req.params.id },
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
    const removedChatDocument = await model.findOneAndRemove(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    )
    if (!chatDocument) {
      return res
        .status(400)
        .json({ message: "couldn't retrieve chat for delete" })
    }
    res.status(200).json({ data: removedChatDocument })
  } catch (e) {
    console.log(e)
    return res.status(400).end()
  }
}

exports.controllers = (model) => ({
  fetchOne: fetchOne(model),
  fetchMany: fetchMany(model),
  updateOne: updateOne(model),
  createOne: createOne(model),
  deleteOne: deleteOne(model),
})
