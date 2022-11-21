const {body} = require('express-validator')

const userCreateValidation = () => {

  return[ body("name")
  .isString()
  .withMessage("O nome do usuário é obrigatório")
  .isLength({min: 7})
  .withMessage("O nome do usuário precisa de 7 caracteres"),

  body("email")
  .isString()
  .withMessage("o email é obrigatório")
  .isEmail()
  .withMessage("O email deve ser válido"),

  body("password")
  .isString()
  .withMessage("a senha é obrigatória")
  .isLength({min: 8})
  .withMessage("a senha deve ter no minimo 8 digitos"),

  body("confirmPassword")
  .isString()
  .withMessage("é obrigatório confimar a senha")
  .custom((value, {req}) =>{
    if(value != req.body.password){
      throw new Error("a senhas não são iguais")
    }
    return true
  }),

]
  
}

const userLogin = () =>{
  return[ 
    body("email")
    .isString()
    .withMessage("Preencher o email é obrigatório!")
    .isEmail()
    .withMessage("Preencha um email válido!"),

    body("password")
    .isString()
    .withMessage("O uso da senha é obrigatório!")
    .isLength({min: 8})
    .withMessage("a senha deve ter no minimo 8 digitos")


  ]
}

const userUpdate = () =>{
  return[
    body("name")
    .optional()
    .isLength({min:7})
    .withMessage("o nome precisa de pelo menos 7 caracteres"),

    body("password")
    .optional()
    .isLength({min: 8})
    .withMessage("a senha deve conter 8 caracteres"),
  ]
}

module.exports = {
  userCreateValidation,
  userLogin,
  userUpdate,
}