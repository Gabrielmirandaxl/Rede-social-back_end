const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileImage: String,
  bio: String,

}, {
  timestamps: true
})

const Model = mongoose.model("users", schema)

module.exports = Model