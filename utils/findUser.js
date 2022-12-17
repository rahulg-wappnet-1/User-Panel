const user = require('../models/user')
exports.findUser= async(email) =>{
    console.log('enter');
    const user = await User.findOne({email})
    if(user){
        return user;
    }
}