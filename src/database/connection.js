const mongoose = require('mongoose')

function connect(){
  mongoose.connect("mongodb://localhost:27017/instagram")

  const db = mongoose.connection

  db.once("open", () => {
    console.log("connected database")
  })

  db.on("error", () =>{
    console.error.bind(console, "connecton failed database")
  })

}


module.exports = {
  connect
}