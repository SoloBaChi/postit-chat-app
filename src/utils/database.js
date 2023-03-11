const mongoose = require('mongoose')
//getting the database url
const configUrl = require('../config/databaseUrl')

//using a named export
exports.connectToDatabase = async () => {
  try {
    const con = await mongoose.connect(configUrl.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`connected successfully at ${con.connection.host} database`)
  } catch (e) {
    console.log(e.message)
  }
}
