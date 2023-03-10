const mongoose = require('mongoose')

const { configUrl } = require('../config/url')

const connectToDatabase = async () => {
  try {
    const connect = await mongoose.connect(configUrl.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`Connection Successful`)
  } catch (e) {
    console.log('failed to connect to database', e)
  }
}
module.exports = { connectToDatabase }
