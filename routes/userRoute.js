const router = require('express').Router()
//multer for uploading form-data in db
const multer = require('multer')
const upload = multer();

const{signUp, logIn, getAllUsers,getUser} = require('../controllers/userConntroller')

//user routers

//route for sign up
router.post('/signup',signUp)

//route for login
router.post('/login',logIn)

//route to get all registered users
router.get('/allusers',getAllUsers)

//route to get particular user
router.post('/user',getUser)

module.exports = router