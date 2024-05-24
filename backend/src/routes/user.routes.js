const { updateProfileController, getOneUserController, getAllUserController } = require("../controllers/user.controller")
const auth = require("../middlewares/auth.middleware")
const validateRequest = require("../middlewares/validation.middleware")
const upload = require("../services/multer")
const { updateSchema } = require("../validators/user.validation")

const userRouter=require("express").Router()

userRouter.patch("/update/:id",auth,upload.single("image"),validateRequest(updateSchema),updateProfileController)
userRouter.get("/:id",auth,getOneUserController)
userRouter.get("/",auth,getAllUserController)

module.exports=userRouter