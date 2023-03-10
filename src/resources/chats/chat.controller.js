const { controllers } = require('../../utils/crud')
const chatModel = require('./chat.model')

module.exports = controllers(chatModel)
