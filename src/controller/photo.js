
const ModelPhoto = require("../models/Photo")
const ModelUser = require("../models/User")

async function createPhoto(request, response){

try {
  
 const {title} = request.body
 const image = request.file.filename
 const {id} = request.user
 console.log(request.user)

 

 const imageUser = await ModelPhoto.create({
  title: title,
  image: image,
  username: request.user.name,
  userId: id
 })

 
 return response.status(201).json({publicação: imageUser})

} catch (error) {
  console.error(error)
}
}




async function getUserImage(request, response){
  try {
     const {id} = request.params
     console.log(id)
   
      const getImage = await ModelPhoto.find({userId: id})
      
      if(!getImage){
        return response.status(404).json({erro: "photos not found"})
      }

      return response.status(200).json({userImage: getImage})

  } catch (error) {
    console.log(error)
  }
}





async function likeImage(request, response){
  try {

    const {id} = request.params
    const user = request.user

    const photo = await ModelPhoto.findById(id)

    if(!photo){
      return response.status(404).json({erro: "photo not found"})
    }

    if(photo.likes.includes(user.id)){
      return response.status(422).json({erro: "você já curtiu essa foto"})
    }

    photo.likes.push(user.id)
    photo.save()

    return response.status(200).json({
      photo: id,
      userId: user.id,
      message: "a foto foi curtida",
    })
    
  } catch (error) {
    console.error(error)
  }
}

async function commentImage(request, response){
  try {
    
 const {id} = request.params
 const {comment} = request.body


 const user = request.user
 const photo = await ModelPhoto.findById(id)

 if(!photo){
  return response.status(404).json({error: " photo not found"})
 }

 const userComment = {
  comment: comment,
  name: user.name,
  image: user.profileImage,
  userId: user.id,

 }

 photo.commentes.push(userComment)

 photo.save()

 return response.status(200).json({
  userComment: userComment,
  message: "mensagem adicionada com sucesso"
 })

  } catch (error) {
    console.error(error)
  }
}

async function searchImage(request, response){
  try {
    
    const {q} = request.query

    const photo = await ModelPhoto.find({title: new RegExp(q, "i")})

    return response.status(200).json(photo)

  } catch (error) {
    console.error(error)
  }
}



module.exports = {
  createPhoto,
  getUserImage,
  likeImage,
  commentImage,
  searchImage,
}