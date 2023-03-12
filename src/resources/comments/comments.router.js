const { Router } = require('express')
const controllers = require('./comments.controller')

const router = Router()

router
  .route(`/:id/comments`)
  .get(controllers.fetchComments)
  .post(controllers.createOneComment)

router
  .route(`/:id/comments/:id`)
  .get(controllers.fetchOneComment)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne)

module.exports = router
