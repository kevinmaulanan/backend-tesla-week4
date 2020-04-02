const processAuthentifikasi = require('../../../models/post/authentikasi/authentikasi')
const jwt = require('jsonwebtoken')

const registerAuthentifikasi = async (req, res) => {
    try {
        const { username, password, email } = req.body
        const data = await processAuthentifikasi.registerAuthentikasi(username, password, email)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })

        } else {
            res.status(401).send({
                success: false,
                message: 'Gagal membuat akun'
            })
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            message: error.message
        })
    }
}

const verifyUser = async (req, res) => {
    try {
        const { verifyCode } = req.body
        const data = await processAuthentifikasi.verifyUser(verifyCode)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Kesalahan Query'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


const loginAuthentikasi = async (req, res) => {
    try {
        const { username, password } = req.body
        const data = await processAuthentifikasi.loginAuthentikasi(username, password)
        const getUser = { ...data }
        const token = jwt.sign(getUser, process.env.APP_KEY, null)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Login berhasil',
                data: data,
                token
            })

        } else {
            res.status(500).send({
                success: false,
                message: 'Kesalahan pada saat login'
            })
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            message: error.message
        })

    }
}


module.exports = {
    registerAuthentifikasi,
    loginAuthentikasi,
    verifyUser,
}