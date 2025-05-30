
const express = require("express")
const app = express()
const userRouter = require("./controller/userRouter.js")
const connectDB = require("./config/database.js")
const isAuthenticate = require("./middleware/isAuthenticate.js")
const checkAccess = require("./middleware/checkAccess.js")
const blackList  = require("./blackList.js")
const jwt = require("jsonwebtoken")

app.use(express.json())
app.use("/user" , userRouter)

// healthcheck
app.get("/health" , (req , res)=>{
    res.send("connected!")
})

// private
app.get("/privateData" ,isAuthenticate , (req, res)=>{
    res.send("private Data!")
})

// admin
app.get("/admin" ,isAuthenticate ,checkAccess("admin") ,(req , res)=>{
    res.send("admin Data!")
})

// logout
app.get("/logout" , (req ,res)=>{
    const token = req.headers?.authorization?.split(" ")[1]
    if(token){
        blackList.add(token)
    }
    res.status(200).json({message:"logout succesfully!"})
})

// generate new toke

app.post("/generateToken" , (req ,res)=>{
    const refreshToken = req.body.token
    const refreshSecretKey = process.env.REFRESH_SECRET_KEY
    const accessSecretKey = process.env.ACCESS_SECRET_KEY

    if(refreshToken){
        

     jwt.verify(refreshToken ,refreshSecretKey , (err , decode)=>{
            if(err){
                res.status(404).json({message:"Error to generate new token"})
            }
            const accessToken = jwt.sign({name:decode.name , email:decode.email , role:decode.role} ,accessSecretKey , {expiresIn:"30s"})
            res.status(201).json({message:"accessToken generated by refreshToken" , accessToken:accessToken})
     })
    }
})

app.listen(3000 , async()=>{
    await connectDB()
    console.log("server is running")
})