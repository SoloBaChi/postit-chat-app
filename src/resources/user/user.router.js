const express = require('express')
const { userDetails, updateUserDetails } = require('./user.controller')
const { Router } = express
const router = Router()

router.get('/', userDetails)
router.put('/', updateUserDetails)

module.exports = router
