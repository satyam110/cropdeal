const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PW
    }
});

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'julia45@ethereal.email',
//         pass: 'S9wedKyPUbJ4TjsNXy'
//     }
// });

module.exports.sendEmail = function(mailData) {
    transporter.sendMail(mailData, function(error, info){
        if(error) {
            console.log(error);
        } else {
            console.log("Email sent : "+ info.response);
        }
    })
}