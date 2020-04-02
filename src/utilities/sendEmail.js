const nodeMailer = require('nodemailer')
require('dotenv').config()

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
})

const mailOptions = (to, codeVerify) => ({
    from: process.env.USER_EMAIL,
    to: to,
    subject: 'Verify Your Account',
    html: 
    `
        <h2>Hi... How is your day? Hope it goes awesome</h2>
        <h3>This is Code to Verify Your Account</h3>
        <strong>${codeVerify}</strong>
        <h3>Please verify your account before proceed to login.</h3>
        <h3>Thank you and please enjoy our app.</h3>
    `
})

const SendingEmail = (to, codeVerify) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions(to, codeVerify), (err, info) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log(info)
                console.log('lo')
                resolve(true)
            }
        })
    })
}

module.exports = SendingEmail