const {body} = require("express-validator")

const comment = () =>{
  return [
    body("comment")
    .escape()

  ]
}

module.exports = {
  comment,
}