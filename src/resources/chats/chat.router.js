const { Router } = require('express')
const controllers = require('./chat.controller')

const router = Router()

//for all routes
router.route(`/`).get(controllers.fetchMany)
// .delete(controllers.deleteAll)

//for a route with an id
router
  .route(`/:id`)
  .post(controllers.createOne)
  .get(controllers.fetchOne)
  .put(controllers.updateOne)
  .delete(controllers.deleteOne)

module.exports = router
