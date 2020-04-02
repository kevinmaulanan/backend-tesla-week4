const authModel = require('../../../models/Post/auth/auth')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body
        console.log('register')
        console.log(username, password, email)
        const data = await authModel.register(username, password, email)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })

        } else {
            res.status(401).send({
                success: false,
                message: 'Failed to register'
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
        const data = await authModel.verifyUser(verifyCode)
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
        const data = await authModel.loginAuthentikasi(username, password)
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
    register,
    loginAuthentikasi,
    verifyUser,
}