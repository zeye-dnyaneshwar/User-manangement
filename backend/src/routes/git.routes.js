const { getAcccessTokenController, getUserDataController } = require('../controllers/git.controllers')

const gitRouter=require('express').Router()

gitRouter.get("/accessToken",getAcccessTokenController)
gitRouter.get("/getUserData",getUserDataController)

module.exports=gitRouter
