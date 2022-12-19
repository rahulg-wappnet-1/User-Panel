//genertes the cookie token for user while sign up and login

const cookieToken = (user,res) =>{
    const token = user.getJwtToken()
    const option = {
        expires: new Date(
            Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
    };

    user.password = undefined
        return res.cookie("token",token,option)   
}

module.exports = cookieToken;