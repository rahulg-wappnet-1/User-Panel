const mongoose = require('mongoose')

//database connection
const connectWithDb = () =>{
    mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log('Db connected'))
        .catch(error =>{
            console.log('Connection failed with db');
            console.log(error);
        })
}

module.exports = connectWithDb