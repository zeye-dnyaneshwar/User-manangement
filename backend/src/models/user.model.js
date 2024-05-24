const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    accountType:{
        type:String,
        enum:["Public","Private"],
        default:"Public"
    },
    bio:{
        type:String,
        default:"Hey! I am Using Voosh App"
    },
    phone:{
        type:String,
        default:"123-456-78"
    },
    image:{
        type:String,
        default:"https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
    }
})

const User=mongoose.model("user",userSchema)

module.exports=User