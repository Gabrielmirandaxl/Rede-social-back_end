const router = require('express').Router()
const UserController = require('../controller/User')
const PhotoController = require("../controller/photo")

//middlewares
const validation = require('../middlewares/handleValidation')
const userValidation = require('../middlewares/userValidation')
const autheValidation = require('../middlewares/autheValidation')
const imageUpload = require('../middlewares/imageUpdateValidation')
const imageValidation = require("../middlewares/imageValidation")
const commentValidation = require("../middlewares/comentValidation")


//create user
router.post("/register", userValidation.userCreateValidation(), validation, UserController.createUser)

//login user
router.post("/login", userValidation.userLogin(), validation, UserController.loginUser)

//teste token
router.get("/profile", autheValidation, UserController.getCurrentUser )

//update
router.put("/updateProfile", autheValidation, userValidation.userUpdate(),  imageUpload.single("profileImage"),validation, UserController.userUpdate )

//getUserID
router.get("/user/:id", UserController.getUserId)

router.post("/insertImage", autheValidation, imageUpload.single("image"), imageValidation.imageValidation() , validation, PhotoController.createPhoto)

router.get("/userImage/:id", autheValidation,  PhotoController.getUserImage)

router.put("/likeImage/:id", autheValidation, PhotoController.likeImage)

router.put("/comment/:id", autheValidation, commentValidation.comment(), validation, PhotoController.commentImage)

router.get("/search", autheValidation, PhotoController.searchImage)

module.exports = router