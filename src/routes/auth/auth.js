const auth = require('express').Router()
const { register, login, verifyUser, forgotPasswordRequest, forgotPasswordSuccess } = require('../../controller/post/auth/auth')

auth.post('/register', register)
auth.post('/login', login)
auth.post('/verify', verifyUser)
auth.post('/forgot-password', forgotPasswordRequest)
auth.post('/forgot-password/success', forgotPasswordSuccess)

module.exports = { auth }