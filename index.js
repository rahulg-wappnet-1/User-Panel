const app =require('./app')
const connectWithDb = require('./config/db')
require('dotenv').config()

//database connection
connectWithDb();

//server initialisation
app.listen(process.env.PORT , () =>{
    console.log(`Listening at port : ${process.env.PORT}`);
})

