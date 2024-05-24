const checkRole=(permittedRole)=>{
    return (req,res,next)=>{
        if(permittedRole.includes(req.role)){
            next()
        }else{
            res.status(200).json({msg:"not authorized"})
        }
    }
}

module.exports=checkRole