const auth = require('express').Router()
const { register, login, verifyUser } = require('../../controller/Post/auth/auth')

auth.post('/register', register)
auth.post('/login', login)
auth.post('/verify', verifyUser)

module.exports = { auth }