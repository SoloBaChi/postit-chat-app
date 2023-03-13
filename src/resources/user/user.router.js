const express = require('express')
const { fetchOne } = require('../comments/comments.controller')
const { userControllers } = require('./user.controller')
const { Router } = express
const router = Router()

//get  and replace all users
router.route('/').get(userControllers.userDetails)

//get ,update(replace)and delete a single user
router
  .route('/:id')
  .get(userControllers.fetchOne)
  .put(userControllers.updateUserDetails)
  .delete(userControllers.deleteOne)

//get all posts made by a user
router.route('/:id/chats').get(userControllers.fetchMany)

//get a single post made by user
router.route('/:id/chats/:id').get(userControllers.fetchOne)

//get all posts made by a user with all comments
router
  .route(':/id/chats/:id/comments')
  .get(userControllers.fetchChatWithManyComments)

//get all posts made by a user with one comment
router
  .route(':/id/chats/:id/comments/:id')
  .get(userControllers.fetchChatWithOneComment)
  .delete(userControllers.deleteOne)

module.exports = router
