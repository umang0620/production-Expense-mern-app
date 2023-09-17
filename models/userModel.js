const mongoose = require("mongoose");


//Scheme Design
const UserScema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email. is requried and should be unique']
    },
    password:{
        type:String,
        required:[true, 'Password is required']
    }
},{timestamps:true});

//exports
const userModel = mongoose.model('users', UserScema);
module.exports = userModel;