const { controllers } = require('../../utils/crud')
const commentsModel = require('./comments.model')

module.exports = controllers(commentsModel)
