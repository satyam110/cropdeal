require('dotenv').config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PW
    }
});

module.exports.sendEmail = function(mailData) {
    transporter.sendMail(mailData, function(error, info){
        if(error) {
            console.log(error);
        } else {
            console.log("Email sent : "+ info.response);
        }
    })
}