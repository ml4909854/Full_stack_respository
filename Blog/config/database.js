

const mongoose = require("mongoose")
const mongoUrl = "mongodb://127.0.0.1:27017/db"

const connectDb  = async()=>{
try {
    await mongoose.connect(mongoUrl)
    console.log("database connected!")
} catch (error) {
    console.log(error)
}
}

module.exports  = connectDb