const express = require('express')
const morgan = require('morgan')
const { json, urlencoded } = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const chatRouter = require('./resources/chats/chat.router')
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
app.use('/api/chat', log, chatRouter)

//create a port
const PORT = process.env.PORT || 3001

//listen to the app by starting the server
const start = () => {
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`)
  })
}

//export the start function to index.js file
module.exports = { start }
