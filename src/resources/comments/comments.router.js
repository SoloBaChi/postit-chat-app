const { Router } = require('express')
const controllers = require('./comments.controller')

const router = Router()

router
  .route(`/:id/comments`)
  .get(controllers.fetchMany)
  .post(controllers.createOne)

router
  .route(`/:id/:id/comments`)
  .get(controllers.fetchOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne)

module.exports = router
