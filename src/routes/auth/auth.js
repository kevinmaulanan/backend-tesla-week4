const auth = require('express').Router()
const { register, loginAuthentikasi, verifyUser } = require('../../controller/Post/auth/auth')

auth.post('/register', register)
auth.post('/login', loginAuthentikasi)
auth.post('/verify', verifyUser)

module.exports = { auth }