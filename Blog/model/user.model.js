

const mongoose  = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{type:String , required:true},
    password:{type:String , required:true},
    role:{type:String , required:true , default:"author"},
},{
    timestamps:true,
    versionKey:false
})

module.exports = mongoose.model("user" , userSchema)