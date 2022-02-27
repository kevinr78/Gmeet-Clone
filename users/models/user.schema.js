const mongoose = require('mongoose')


const UserSchema =new mongoose.Schema({
    name:{type:String,required:true, min:2},
    email:{type:String,required:true},
    password:{type:String,required:true},
    date:{type:Date,default:Date.now()}
})


module.exports = new mongoose.model("User", UserSchema)