const mongoose=require("mongoose")

const connection=mongoose.connect(process.env.MONGO_URL)

const connectDB=async()=>{
    try {
        await connection
        console.log("Connected To the Database")
    } catch (error) {
        console.log("ERROR Connecting DB:- "+error.message)
        process.exit(1)
    }
}

module.exports=connectDB