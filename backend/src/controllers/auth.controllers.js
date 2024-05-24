const bcrypt=require("bcrypt")
const jwt = require('jsonwebtoken');

const authContext=require("../db/context/auth.context")
const blacklistContext=require("../db/context/blacklist.context")
const registerController=async(req,res)=>{
    const {name,email,password,role='user'}=req.body
    try {
       const isUserAvailable=await authContext.getUserByEmail(email)
       if(isUserAvailable){
        return res.status(409).json({msg:"User Already Exist"})
       }
       const hashedPassword=await bcrypt.hash(password,2)
       const newUser=await authContext.createNewUser({name,email,password:hashedPassword,role})
       const token = jwt.sign({ userId: newUser._id,userRole:newUser.role  }, process.env.JWT_SECRET_KEY);
       return res.status(201).json({msg:"User Created Successfully",user:{
        _id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        token
       }})
    } catch (error) {
       return res.status(500).json({msg:"Internal Server Error",error:error.message})
    }
}

const loginController=async(req,res)=>{
    const {email,password}=req.body
    try {
       const isUserAvailable=await authContext.getUserByEmail(email)
       if(!isUserAvailable){
        return res.status(404).json({msg:"User Not Found"})
       }
       const checkPassword=await bcrypt.compare(password,isUserAvailable.password)
       if(!checkPassword){
        return res.status(401).json({msg:"Incorrect Password"})
       }
       const token = jwt.sign({ userId: isUserAvailable._id,userRole:isUserAvailable.role }, process.env.JWT_SECRET_KEY);
       return res.status(201).json({msg:"User Logged In Successfully",user:{
        _id:isUserAvailable._id,
        name:isUserAvailable.name,
        email:isUserAvailable.email,
        token
       }})
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error",error:error.message})
    }
}

const logoutController=async(req,res)=>{
    const {token}=req.body
    try {
        const newBlacklistToken=await blacklistContext.addBlacklistToken(token)
        return res.status(200).json({msg:"You have Logged out"})
    } catch (error) {
        return res.status(500).json({msg:"Internal Server Error",error:error.message})
    }
}

module.exports={registerController,loginController,logoutController}