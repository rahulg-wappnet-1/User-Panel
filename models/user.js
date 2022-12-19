const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const bcrypt = require('bcrypt')
const validator = require('validator')
//const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Schema for user
//fields :- name , email , role ,password (string types)
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require: [true, 'Please enter the name']
    },
    email:{
        type:String,
        require: [true, 'Please enter the email'],
        validate: [validator.isEmail, 'Please enter email in correct format'], 
        unique:true
    },
    role:{
        type:String,
        require:[true,'Please enter the role'],
    },
    password:{
        type:String,
        require:[true,'Please enter the password'],
        minlength:[8,'Password must be of 8 or more chars'],
        select :false
    },
    photo:{
        id:{
            type:String,
            required:true
        },
        secure_url:{
            type:String,
            required:true
        }
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
   
    task:{
        type:String
    }
})

//using pre hook of mongoose
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10);
})

//checks weather the pass word is valid or not
userSchema.methods.isValidatedPassword = async function(userSentPassword){
    return await bcrypt.compare(userSentPassword,this.password)
}

//returns the jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
};


//exporting the userSchema
module.exports = mongoose.model("User",userSchema)