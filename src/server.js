const express = require('express')
const morgan = require('morgan')
const { json, urlencoded } = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const { connectToDatabase } = require('./utils/database')

//create an app
const app = express()

//installed middlewares
app.use(cors)
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

//configure dotenv path
dotenv.config({ path: '.env' })
connectToDatabase()

//custome middlewares

//create a port
const PORT = process.env.PORT || 3000

//listen to the app by starting the server
const start = () => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
  })
}

//export the start function to index.js file
module.exports = { start }
