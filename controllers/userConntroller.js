const User = require('../models/user');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary')
const cookie = require('../utils/cookieToken')
const findUser = require('../utils/findUser');
const user = require('../models/user');

//sign up for user
//required fileds :- name,email, password
exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  
const task='';
const role = 'employee'
  //validation
  if(!req.files){
    console.log("ENter in image check");
    res.send('image required for sign up')
  }
  if(!email || !name || !password || !role){
    res.send('Please fill all required credentials')
  }

  let file = req.files.image;
  const result = await cloudinary.v2.uploader.upload(file.tempFilePath,{
    folder: "users",
    width: 150,
    crop: "scale"
  });

  const user = await User.create({
    name, 
    email,
    role,
    password,
    photo:{
      id:result.public_id,
      secure_url:result.secure_url
    },
   task
  })

  cookie(user,res);
    res.render('userData',{
      user:user
    })
   
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

cookie(user,res)
res.render('userData',{
  user:user
})
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
      return  user;
    }   
}

//create the task for user
exports.createTask = async(req,res)=>{
  const {name,email} = req.body
  const user = await User.findOne({email})
  user.task = name
  res.render('userData',{
    user:user
  })  
}

//delete the user from system
exports.deleteUser = async(req,res) =>{
  const{email} = req.body
  await user.deleteOne({email})
  res.send('User deleted')
}

//assign the roles to user
exports.assignRole = async(req,res) =>{
  const{email,role} = req.body
  console.log(role);
  const user = await User.findOne({email})
  user.role = role
  res.render('userData',{
    user:user
  })
}

//render the error page
exports.renderError = async(req,res)=>{
  res.render('error')
}

//render the task creation page
exports.taskRender = async(req,res) =>{
  res.render('task')
}


//renders the role assignment page
exports.assignRoleRender = async(rq,res) =>{
  res.render('assignRole')
}

//renders the delete user page
exports.renderUserDelete = async(req,res) =>{
  res.render('deleteUser')
}