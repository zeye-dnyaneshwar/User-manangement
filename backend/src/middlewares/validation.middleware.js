const validateRequest=(schema)=>async(req,res,next)=>{
    try {
        const { error } = await schema.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        next();
      } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports=validateRequest