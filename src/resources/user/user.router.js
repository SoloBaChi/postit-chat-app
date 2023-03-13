const express = require('express')
const { userControllers } = require('./user.controller')
const { Router } = express
const router = Router()

router
  .route('/')
  .get(userControllers.userDetails)
  .put(userControllers.updateUserDetails)

module.exports = router
