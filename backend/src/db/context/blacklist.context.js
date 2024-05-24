const { Blacklist } = require("../../models")

const getBlacklistToken=async(token)=>{
    const blacklistToken=await Blacklist.findOne({token})
    return blacklistToken
}

const addBlacklistToken=async(token)=>{
    const newBlacklistToken =await new Blacklist({token}).save()
    return newBlacklistToken
}

module.exports={getBlacklistToken,addBlacklistToken}