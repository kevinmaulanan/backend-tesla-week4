const nodeMailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

require('dotenv').config()



let transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
})

const handlebarOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: './src/utilities/views',
        layoutsDir: './src/utilities/views',
        defaultLayout: 'index.handlebars',
    },
    viewPath: './src/utilities/views',
    extName: '.handlebars',
};

transporter.use('compile', hbs(handlebarOptions))



let mailOptions = (to, codeVerify) => ({
    from: process.env.USER_EMAIL,
    to: to,
    subject: 'Verify Your Account',
    template: 'index',
    context: {
        codeVerify: `${codeVerify}`
    }

})

const SendingEmail = (to, codeVerify) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions(to, codeVerify), (err, info) => {
            if (err) {
                console.log('woi', err)
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