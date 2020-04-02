const db = require('../../../config/db')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const uuid = require('uuid').v1
const sendEmail = require('../../../utilities/sendEmail')


module.exports = {
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            // Check is there any user with username provided
            db.query(`SELECT COUNT(*) as total FROM user_privates WHERE username='${username}'`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Wrong username or password'))
                } else {
                    // Check is the user has verify his/her account
                    db.query(`SELECT * FROM user_privates WHERE username='${username}'`, (error, result) => {
                        const isVerify = result[0].is_verify
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
                                db.query(`SELECT user_privates.id, user_details.user_fullname, user_details.user_image, user_privates.username, user_privates.email FROM user_privates JOIN user_details ON user_privates.id_user_detail = user_details.id WHERE username='${username}'`, (error, result) => {
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
            if (username === "" || password === "" || email === "") {
                reject(new Error('Cannot empty. Please provide the required fields.'))
            } else {
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

    verifyUser: (verifyCode) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_privates where verification_code='${verifyCode}'`, (error, result) => {

                const { total } = result[0]
                if (total == 0) {
                    reject(new Error('Code Verify Salah'))
                } else {
                    const newVerify = uuid()
                    db.query(`UPDATE user_privates SET verification_code='${newVerify}' ,is_verified=1 WHERE verification_code='${verifyCode}'`, (error, result) => {
                        if (error) {
                            reject(new Error('Kesalahan Query'))
                        } else {
                            const data = 'Berhasil Verifikasi'
                            resolve(data)
                        }
                    })
                }
            })
        })

    }
}