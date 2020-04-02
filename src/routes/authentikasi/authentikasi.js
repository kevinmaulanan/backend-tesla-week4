const authentikasi = require('express').Router()
const { registerAuthentifikasi, loginAuthentikasi, verifyUser } = require('../../controller/post/authentikasi/authentikasi')

authentikasi.post('/register', registerAuthentifikasi)
authentikasi.post('/login', loginAuthentikasi)
authentikasi.post('/verify', verifyUser)

module.exports = {
    authentikasi
}