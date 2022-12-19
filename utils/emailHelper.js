//used to send mails
const nodemailer = require('nodemailer')
const mailHelper = async(option) =>{
  
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASS, // generated ethereal password
        },
    });
    
    const message = {
        from: 'rahulguptaslg20@gmail.com', // sender address
        to: option.email, // list of receivers
        subject: option.subject, // subject line
        text: option.message, // plain text body
      html:`<p>from: <a href='rahulguptaslg20@gmail.com'>rahulguptaslg20@gmail.com</a></p>
      ` +option.html + '<p> This is no reply email</p>' // html body
      }
      
     // console.log("Email sending");
     await transporter.sendMail(message);
}

module.exports = mailHelper
