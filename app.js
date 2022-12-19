const express = require('express')
require('dotenv').config()
const app =express()
const bodyParser = require('body-parser')
const path = require('path')
const fileupload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

//for ejs views
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, '/views'));


//regular middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(morgan("tiny"))
app.use(cookieParser())

app.use(bodyParser.urlencoded ({extended:true}))
app.use(fileupload({
    useTempFiles: true,
    tempFilePath: "/temp/"
})
);

//routes
const user = require('./routes/userRoute')
app.use(user)



//renders the sign up form

//route to render sign up page
app.get('/test',(req,res) =>{
    res.render('signup')
})
//home route
app.get('/',(req,res) =>{
    res.render('signup')
})

//route to render user data 
app.get('/userdata',(req,res) =>{
    res.render({
        user:user
    })
})
//renders the login page
app.get('/test2',(req,res)=>{
    res.render('login')
})




module.exports = app



