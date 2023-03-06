
const express = require("express");


//create an app
const app  = express();




//create a port
const PORT = process.env.PORT || 3000;

//listen to the app by starting the server
const start = () => {
app.listen(PORT,()=>{
console.log(`Listening on port ${PORT}`);
})
}

//export the start function to index.js file
module.exports = { start };