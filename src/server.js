const express = require('express')
const morgan = require('morgan')
const { json, urlencoded } = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const { signUp, signIn, protect } = require('./utils/auth')
const userRouter = require('./resources/user/user.router')
const chatRouter = require('./resources/chats/chat.router')
const commentsRouter = require('./resources/comments/comments.router')
const { connectToDatabase } = require('./utils/database')

//create an app
const app = express()

//installed middlewares
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

//configure dotenv path
connectToDatabase()
dotenv.config({ path: '.env' })

//custome middlewares
const log = (req, res, next) => {
  console.log('logging something')
  next()
}
//authentication and authorization middlewares
app.post('/signup', signUp)
app.post('/signin', signIn)
app.use('/api/users', userRouter)

app.use('/api', protect)
app.use('/api/chats', log, chatRouter)
app.use('/api/chats', commentsRouter)

//create a port
const PORT = process.env.PORT || 3030

//listen to the app by starting the server
const start = () => {
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
  })
}

//export the start function to index.js file
module.exports = { start }
