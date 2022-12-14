const router = require('express').Router()
//multer for uploading form-data in db
const multer = require('multer')
const upload = multer();

const{signUp, logIn} = require('../controllers/userConntroller')

//user routers
router.post('/signup',upload.none(),signUp)
// router.post('/login',upload.none(),logIn)

module.exports = router