const auth = require('express').Router()
const { registerAuthentifikasi, loginAuthentikasi, verifyUser } = require('../../controller/Post/auth/auth')

auth.post('/register', registerAuthentifikasi)
auth.post('/login', loginAuthentikasi)
auth.post('/verify', verifyUser)

module.exports = { auth }