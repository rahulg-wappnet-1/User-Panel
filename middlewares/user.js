const user = require('../models/user')
const jwt = require('jsonwebtoken')

//middleware to check is user logged in system 
//using token
exports.isLoggedIn = async(req,res,next) =>{
    const token = req.cookies.token
    if(!token){
        // res.send('Log in for access')
        res.render('error')
    }else{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id)

    next();
    }
    
}

//check the role of user
//gives access to admin users only
exports.customRole = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            //res.send('Not allowed')
            //res.render('home')
            res.redirect('/error')
        }else{
            next();
        }
        
    }
}