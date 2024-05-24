require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connectDB = require("./db")

const app=express()

app.use(cors())
app.use(express.json())

app.use("/api/v1",require("./routes/index"))

const PORT=process.env.PORT||5000

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is Running at port:-${PORT}`)
    })
})
.catch((error)=>{
    console.log(`Error connecting to server:- ${error.message}`)
})

