const User = require('../models/user')
const bcrypt = require('bcrypt')

//sign up for user
//required fileds :- name,email, password
exports.signUp = async(req,res,next) =>{
    
    const{name,email,password} = req.body;
    //validation 
    if(!name){
        res.send('Enter the name')
    }else if(!email){
        res.send('Enter the email')
    }else if(!password){
        res.send('Enter the password')
    }else{
        //creating document in schema
        const user = await User.create({
            name,
            email,
            password
        })
        res.send(user);
    }
}


// exports.logIn = async (req,res) =>{
//     const{email, password} = req.body;
//     if(!email){
//         res.send('Enter the email')
//     }else if(!password){
//         res.send('Enter the password')
//     }else{
//         const user = await User.findOne({email}).select("+password")
//         if(!user){
//             res.send('Check email or password')
//         }

//         const isPasswordCorrect = await user.isValidatedPassword(password)
//         console.log(password);
//         console.log(isPasswordCorrect);
//         if(!isPasswordCorrect){
//             console.log(password);
//             res.send('Wrong password')
//         }
//         //res.send('Logged in')
//     }
// }

