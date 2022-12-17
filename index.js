const app =require('./app')
const connectWithDb = require('./config/db')
require('dotenv').config()
const cloudinary = require('cloudinary')

//database connection
connectWithDb();

//cloudinary config
 cloudinary.config({
    // cloud_name : process.env.CLODINARY_NAME, 
    // api_key:process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLODINARY_API_SECRET

    cloud_name : 'codersstay',
    api_key : '245156686657848',
    api_secret : 'aVxXZ5QjeqqShsbGplOaVSE_WqA'
 })

//server initialisation
app.listen(process.env.PORT , () =>{
    console.log(`Listening at port : ${process.env.PORT}`);
})

