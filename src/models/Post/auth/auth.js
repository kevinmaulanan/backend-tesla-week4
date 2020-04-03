const db = require('../../../config/db')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const uuid = require('uuid').v1
const sendEmail = require('../../../utilities/sendEmail')


module.exports = {
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            // Check is there any user with the provided username
            db.query(`SELECT COUNT(*) as total FROM user_privates WHERE username='${username}'`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Wrong username or password'))
                } else {
                    // Check is the user has verify his/her account
                    db.query(`SELECT * FROM user_privates WHERE username='${username}'`, (error, result) => {
                        const isVerify = result[0].is_verified
                        if (isVerify === 0) {
                            console.log(error)
                            reject(new Error('Your username has not been verified. Please verify your account first.'))
                        } else {
                            const passwordData = result[0].password
                            const comparePassword = bcryptjs.compareSync(password, passwordData)
                            if (comparePassword == false) {
                                reject(new Error('Wrong username or password'))
                            } else {
                                // Get user data
                                db.query(`SELECT user_privates.id, user_details.user_fullname, user_details.user_image, user_privates.username, user_privates.email, user_privates.id_user_detail FROM user_privates JOIN user_details ON user_privates.id_user_detail = user_details.id WHERE username='${username}'`, (error, result) => {
                                    if (error) {
                                        console.log(error)
                                        reject(new Error('Server error: Wrong query'))
                                    } else {
                                        const data = result[0]
                                        resolve(data)
                                    }
                                })
                            }
                        }
                    })
                }
            })
        })
    },

    register: (username, password, email) => {
        return new Promise((resolve, reject) => {
            // Check if the user has specified the required fields
            if (!username || !password || !email) {
                reject(new Error('Cannot empty. Please provide the required fields.'))
            } else {
                console.log('in here')
                // Check if the username is already used
                db.query(`SELECT COUNT(*) as total FROM user_privates WHERE username='${username}'`, (error, result) => {
                    const { total } = result[0]
                    if (total !== 0) {
                        reject(new Error('Username is already used.'))
                    } else {
                        // Insert user data to user_details table
                        db.query(`INSERT INTO user_details (user_fullname) VALUES('${username}')`, (error, result) => {
                            if (error) {
                                reject(new Error('Wrong query in user detail.'))
                            } else {
                                db.query(`SELECT max(id) AS id FROM user_details`, (error, result) => {
                                    const maxId = result[0].id
                                    const encryptedPassword = bcryptjs.hashSync(password)
                                    const verify = uuid()
                                    // Insert user data to user_privates table
                                    db.query(`INSERT INTO user_privates (username,password,email,verification_code, id_user_detail) VALUES('${username}','${encryptedPassword}','${email}', '${verify}', ${maxId})`, (error, result) => {
                                        if (error) {
                                            reject(new Error('Server error'))
                                        } else {
                                            sendEmail(email, verify).then((status) => {
                                                return resolve(true)
                                            }).catch((error) => {
                                                reject(error)
                                            })
                                            const data = `Username : ${username} is successfuly created. Please check your email to verify your account.`
                                            resolve(data)
                                        }
                                    })
                                })
                            }
                        })
                    }
                })
            }
        })
    },

    verifyUser: (verificationCode) => {
        return new Promise((resolve, reject) => {
            // Check is there any user with the provided username
            db.query(`SELECT COUNT(*) as total FROM user_privates WHERE verification_code='${verificationCode}'`, (error, result) => {
                const { total } = result[0]
                if (total == 0) {
                    reject(new Error('Wrong verification code'))
                } else {
                    const newVerify = uuid()
                    // Update the verification code to be used in forgot password
                    db.query(`UPDATE user_privates SET verification_code='${newVerify}' ,is_verified=1 WHERE verification_code='${verificationCode}'`, (error, result) => {
                        if (error) {
                            reject(new Error('Wrong query'))
                        } else {
                            const data = 'Verification success'
                            resolve(data)
                        }
                    })
                }
            })
        })
    },

    forgotPasswordRequest: (username, email) => {
        return new Promise((resolve, reject) => {
            // Check is there any user with the provided username
            db.query(`
                SELECT user_privates.verification_code AS verificationCode 
                FROM user_privates 
                WHERE username = ${db.escape(username)};
            `, (error, result) => {
                if (error) reject(error)
                else {
                    const { verificationCode } = result[0]
                    sendEmail(email, verificationCode).then((status) => {
                        return resolve(true)
                    }).catch((error) => {
                        reject(error)
                    })
                }
            })
        })
    },

    forgotPasswordSuccess: (verificationCode, newPassword) => {
        return new Promise((resolve, reject) => {
            // Check is the verification code valid
            db.query(`
                SELECT COUNT(*) as total 
                FROM user_privates 
                WHERE verification_code=${db.escape(verificationCode)};
            `, (error, result) => {
                console.log(error)
                if (error) reject(error)
                else {
                    const { total } = result[0]
                    console.log('total', total)
                    if (total == 0) {
                        resolve(false)
                    } else {
                        const newVerify = uuid()
                        const encryptedPassword = bcryptjs.hashSync(newPassword)
                        db.query(`
                            UPDATE user_privates 
                            SET verification_code='${newVerify}', password = '${encryptedPassword}'
                            WHERE verification_code=${db.escape(verificationCode)};
                        `, (error, result) => {
                            if (error) reject(error)
                            else resolve(true)
                        })
                    }
                }
            })
        })
    }
}