const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config/configAuthe.json')

const autheValidation = async (request, response, next) =>{

const Autheheader = request.headers.authorization
const token = Autheheader && Autheheader.split(" ")[1]


if(!Autheheader){
  return response.status(401).json({error: "no token provided"})
}

if(!token){
  return response.status(401).json({error: "acesso negado"})
}

try {

  const verifid = jwt.verify(token, config.secret)

   request.user = await UserModel.findById(verifid.id).select("-password")

   next()
  
} catch (error) {
   return response.status(400).json({error: "token invalido"})
}

}

module.exports = autheValidation