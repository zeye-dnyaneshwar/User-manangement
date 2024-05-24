const bcrypt=require("bcrypt")
const userContext=require("../db/context/user.context")
const updateProfileController=async(req,res)=>{
    const updateUserId=req.params.id
    try {
       if(updateUserId!=req.userId){
        return res.status(401).json({msg:"You can not update others profile"})
       }
       const {password,email,image,...otherFields}=req.body
       // if that email is already present dont allow to change
       if(email){
        const isEmailExist= await userContext.getUserByEmail(email)
        if(isEmailExist){
            return res.status(409).json({msg:"This email is already present"})
        }
       }
       let hashedPassword;
       if (password) {
            hashedPassword = await bcrypt.hash(password, 2);
        }
        
        let profilePic;
        if (req.file) {
          profilePic = req.file.path
        } else if (image) {
          profilePic = image
        }

        const updatedUser = {
            ...otherFields,
            ...(email && { email }),
            ...(password && { password: hashedPassword }),
            ...(profilePic && { image: profilePic })
        };
        await userContext.updateUser(updateUserId,updatedUser)
        return res.status(200).json({msg:"User Updated SuccessFully"})
    } catch (error) {
        return res.status(500).json({msg:"Internal server Error",error:error.message})
    }
}

const getOneUserController=async(req,res)=>{
    const id=req.params.id
    try {
        const user=await userContext.getUserById(id)
        if(!user){
            return res.status(400).json({msg:"User Not Found"})
        }
        if(user.accountType=="Private"){
            if(req.role!=="admin"||req.userId!=id){
                return res.status(401).json({msg:"Not authorized"})
            }
        }
        return res.status(200).json({msg:user})
    } catch (error) {
        return res.status(500).json({msg:"Internal server Error",error:error.message})
    }
}

const getAllUserController=async(req,res)=>{
    try {
        let filter={accountType:"Public"}
        if(req.role=="admin"){
            filter={}
        }
        const users=await userContext.getAllUsers(filter)
        return res.status(200).json({msg:users})
    } catch (error) {
        return res.status(500).json({msg:"Internal server Error",error:error.message})
    }
}

module.exports={updateProfileController,getOneUserController,getAllUserController}