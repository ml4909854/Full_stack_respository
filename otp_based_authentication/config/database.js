

const mongoose = require("mongoose")
const mongoUrl = "mongodb://127.0.0.1:27017/otp"

const connectDB =async ()=>{
    try {
        await mongoose.connect(mongoUrl)
        console.log("database connected!")
    } catch (error) {
        console.log("MongoDB connection failed:" , error)
    }
}

module.exports = connectDB