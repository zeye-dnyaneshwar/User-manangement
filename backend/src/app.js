require("dotenv").config()
const express=require("express")
const cors=require("cors")
const connectDB = require("./db")
const swaggerJsDoc=require("swagger-jsdoc")
const swaggerUi=require("swagger-ui-express")

const app=express()

const options={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Swagger Project",
            version:"1.0.0"
        },
        servers:[
            {
                url:"https://user-manangement-2.onrender.com"
            }
        ]
    },
    apis:["./src/routes/*.js"]
}

const openAPIspec=swaggerJsDoc(options)

app.use(cors())
app.use(express.json())

app.use("/api/v1/docs",swaggerUi.serve,swaggerUi.setup(openAPIspec))
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

