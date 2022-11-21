const {body} = require("express-validator")


const imageValidation = () =>{
   return[
    body("title")
    .isString()
    .withMessage(" o title é obrigatório"),

    body("imagem")
    .custom((value, {req}) => {
      if(!req.file){
        throw new Error("a imagem é obrigatória")
      }

      return true
    })

   ]
}

module.exports = {
  imageValidation,
}