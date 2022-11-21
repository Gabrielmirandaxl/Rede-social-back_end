const mongoose = require('mongoose')

const schema = mongoose.Schema({

  image: String,
  title: String,
  likes: Array,
  commentes: Array,
  userId: String,
  username: String,


}, {
  timestamps: true
})

const Model = mongoose.model("photo", schema)

module.exports = Model