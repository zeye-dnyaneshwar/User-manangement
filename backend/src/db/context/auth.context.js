const { User } = require("../../models")

const getUserByEmail=async(email)=>{
    const user=await User.findOne({email})
    return user
}

const createNewUser=async(payload)=>{
    const createdUser= await new User(payload).save()
    return createdUser
}

module.exports={getUserByEmail,createNewUser}