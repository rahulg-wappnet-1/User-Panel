const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const bcrypt = require('bcrypt')
const validator = require('validator')
//const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.isValidatedPassword = async function(userSentPassword){
    return await bcrypt.compare(userSentPassword,this.password)
}


//exporting the userSchema
module.exports = mongoose.model("User",userSchema)