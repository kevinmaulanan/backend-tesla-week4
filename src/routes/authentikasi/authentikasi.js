const authentikasi = require('express').Router()
const { registerAuthentifikasi, loginAuthentikasi } = require('../../controller/Post/authentikasi/authentikasi')

authentikasi.post('/register', registerAuthentifikasi)
authentikasi.post('/login', loginAuthentikasi)

module.exports = {
    authentikasi
}