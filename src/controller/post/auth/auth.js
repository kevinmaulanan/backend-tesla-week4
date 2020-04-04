const authModel = require('../../../models/post/auth/auth')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { username, password, email } = req.body
        const data = await authModel.register(username, password, email)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'Failed to register account.'
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
        const { verificationCode } = req.body
        const data = await authModel.verifyUser(verificationCode)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'Server error'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const data = await authModel.login(username, password)
        const getUser = { ...data }
        const token = jwt.sign(getUser, process.env.APP_KEY, null)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Login success',
                data: data,
                token
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'Server error'
            })
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            message: error.message
        })
    }
}

const forgotPasswordRequest = async (req, res) => {
    try {
        const { username, email } = req.body
        if (!username || !email) {
            res.status(400).send({
                success: false,
                message: 'Please provide the required fields'
            })
        } else {
            const canResetPassword = await authModel.forgotPasswordRequest(username, email)
            if (canResetPassword) {
                res.status(200).send({
                    success: true,
                    message: 'Verification code has been sent to your email'
                })
            } else {
                res.status(500).send({
                    success: false,
                    message: 'Failed to reset password'
                })
            }
        }
    } catch (error) {
        res.status(401).send({
            success: false,
            message: error.message
        })
    }
}


const forgotPasswordSuccess = async (req, res) => {
    try {
       const { verificationCode, newPassword, confirmPassword } = req.body
       if (!newPassword || !confirmPassword) {
           res.status(400).send({
               success: false,
               messsage: 'Please provide the required fields'
           })
       } else {
           if (newPassword !== confirmPassword) {
               res.status(400).send({
                   success: false,
                   message: 'New password and confirm password must match'
               })
           } else {
            const canResetPassword = await authModel.forgotPasswordSuccess(verificationCode, newPassword)
            if (!canResetPassword) {
                res.status(400).send({
                    success: false,
                    message: 'Failed to reset password'
                })
            } else {
                res.status(200).send({
                    success: true,
                    message: 'Reset password success'
                })
            }
           }
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
    login,
    verifyUser,
    forgotPasswordRequest,
    forgotPasswordSuccess
}
