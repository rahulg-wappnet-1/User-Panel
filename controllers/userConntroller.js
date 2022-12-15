const User = require('../models/user');
const bcrypt = require('bcrypt');
const extract = require('../utils/extractProp');
const extractProp = require('../utils/extractProp');

//sign up for user
//required fileds :- name,email, password
exports.signUp = async (req, res, next) => {
  const { name, email, password , role} = req.body;
  //validation
  if (!name) {
    res.send('Enter the name');
  } else if (!email) {
    res.send('Enter the email');
  } else if (!password) {
    res.send('Enter the password');
  }else if(!role){
    res.send('Choose the role')
  } else {
    //creating document in schema
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    res.redirect('/test2')
  }
};

//login for user
//required fields :- email, password
exports.logIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    res.send('Enter the email');
  } else if (!password) {
    res.send('Enter the password');
  }
  const user = await User.findOne({ email }).select('+password');
 
  if (!user) {
    res.send('Check email or password');
  }

  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    res.send('Wrong password');
  }
res.redirect('/allusers')
}

//get all users registered
exports.getAllUsers = async(req,res) =>{
    const userArray = await User.find();
    res.render('allUsers',{
        users:userArray
    })
}


//get a particular user 
//input field to search user  :- email
exports.getUser = async(req,res) =>{
    const {email} = req.body;
    const user = await User.findOne({email})
    if(user === null){
      res.send('User does not exist')
    }else{
      res.render('userData',{
        user:user
      })
    }   
}

