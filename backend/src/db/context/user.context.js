const { User } = require("../../models")

const getUserByEmail=async(email)=>{
    const user=await User.findOne({email})
    return user
}

const updateUser=async(userId,payload)=>{
    return await User.findByIdAndUpdate(userId, payload, { new: true });
}

const getUserById=async(id)=>{
    const user=await User.findOne({_id:id}).select('-password')
    return user
}

const getAllUsers=async(filter)=>{
    const users=await User.find(filter)
    return users
}
module.exports={getUserByEmail,updateUser,getUserById,getAllUsers}