const { controllers } = require('../../utils/crud')
const Chat = require('./chat.model')

module.exports = controllers(Chat)
