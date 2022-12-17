const router = require('express').Router()
const {customRole,isLoggedIn} = require('../middlewares/user')
//multer for uploading form-data in db
const multer = require('multer')
const upload = multer();

const{signUp, logIn, getAllUsers,getUser,taskRender,createTask, deleteUser, assignRole, assignRoleRender, renderUserDelete,renderError} = require('../controllers/userConntroller')

//user routers

//route for sign up
router.post('/signup',signUp)

//route for login
router.post('/login',logIn)


//route to get particular user
router.post('/user',getUser)

//routes to render views
router.get('/task',taskRender)
router.get('/assignRole',assignRoleRender)
router.get('/deleteUser',renderUserDelete)
router.get('/error',renderError)


//routes with middleware
router.route('/deleteuser').post(isLoggedIn,customRole('admin'),deleteUser)
router.route('/assignrole').post(isLoggedIn,customRole('admin'),assignRole)
router.route('/createtask').post(isLoggedIn,customRole('admin'),createTask)



module.exports = router