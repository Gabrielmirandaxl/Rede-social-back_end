
const multer = require('multer')
const path = require('path')

module.exports = (multer({
    storage: multer.diskStorage({
     
   destination:  (request, file, cb) => {
    let folder = ""

    if(request.baseUrl.includes("users")){
      folder = "users"
    }

    else if(request.baseUrl.includes("photos")){
      folder = "photos"
    }

    cb(null, `./src/uploads/${folder}`)

   },

   filename: (request, file, cb) => {

    cb(null, Date.now() + path.extname(file.originalname))

   },

    }),

    fileFilter: (request, file, cb) =>{
      if(!file.originalname.match(/\.(png|jpg)$/)){
        throw new Error("O tipo de imagem aceita no sistema é só png ou jpg")
      }
  
      cb(null, true)
    }
}))
