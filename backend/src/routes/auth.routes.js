const { registerController, loginController, logoutController } = require("../controllers/auth.controllers")
const auth = require("../middlewares/auth.middleware")
const validateRequest = require("../middlewares/validation.middleware")
const { registerSchema, loginSchema, logOutSchema } = require("../validators/auth.validation")

const authRouter=require("express").Router()

authRouter.post("/register",validateRequest(registerSchema),registerController)
authRouter.post("/login",validateRequest(loginSchema),loginController)
authRouter.post("/logout",auth,validateRequest(logOutSchema),logoutController)

module.exports=authRouter