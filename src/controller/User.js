const UserModel = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const config = require('../config/configAuthe.json')


//generate user token

const generateToken = (id) =>{
  return jwt.sign({id}, config.secret, {
    expiresIn: 84600,
  })
   
}

 async function createUser(request, response){

  try {

   const {name, email, password} = request.body

   const existUser = await UserModel.findOne({email: email})

   if(existUser){
    return response.status(400).json({error: "esse email já existe"})
   }

   const salt = await bcrypt.genSalt()
   const passwordHash = await bcrypt.hash(password, salt)
  
   const newUser = await UserModel.create({
    name,
    email,
    password: passwordHash,
   })

   
   return response.status(200).json({
      newUser: newUser,
      token: generateToken(newUser.id)

   })

    
  } catch (error) {
    console.error(error)
  }

}

async function loginUser(request, response){

  try {

    const {email, password} = request.body

    const userEmail = await UserModel.findOne({email: email})
   
    if(!userEmail || !(await bcrypt.compare(password, userEmail.password))){
      return response.status(404).json({error: "email or password not found"})
    }

     return response.status(200).json({
      user: userEmail,
      token: generateToken(userEmail.id),
     })
    
  } catch (error) {
    console.error(error)
    return response.status(500).json({error: "erro in server"})
  }

}


async function userUpdate(request, response){
  try {


    const {id} = request.user
    console.log(id)
    const {name, password} = request.body
    const profileImage = request.file
    console.log(profileImage)
   
   
    const user = await UserModel.findById(id)

    user.name = name
    if(password){
      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(password, salt)
      user.password = hashPassword
     }

     if(profileImage){
      user.profileImage = request.file.filename
     }
  
     
     
    await user.save()
    
    return response.status(200).json({user})
    

  } catch (error) {
    console.log(error)
  }
}

async function getUserId(request, response){
  
  try {
    const {id} = request.params
  console.log(id)
    const user = await UserModel.findById(id)


    return response.status(200).json({userId: user})


  } catch (error) {
    return response.status(404).json({error: "user not found"})
  }
}


const getCurrentUser = async (request, response) =>{
  const user = request.user

  return response.status(200).json(user)
}

module.exports = {
  createUser,
  loginUser,
  userUpdate,
  getUserId,
  getCurrentUser,
}