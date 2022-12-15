const express = require('express')
require('dotenv').config()
const app =express()
const bodyParser = require('body-parser')
const path = require('path')

//for ejs views
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));

//regular middlewares
app.use(express.json())
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded ({extended:true}))

//routes
const user = require('./routes/userRoute')
app.use(user)

//renders the sign up form
app.get('/test',(req,res) =>{
    res.render('signup')
})

//renders the login page
app.get('/test2',(req,res)=>{
    res.render('login')
})
module.exports = app



