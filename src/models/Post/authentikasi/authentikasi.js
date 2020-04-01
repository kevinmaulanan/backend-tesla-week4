const db = require('../../../config/db')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const uuid = require('uuid').v1


module.exports = {
    loginAuthentikasi: (username, password) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_privates where username='${username}'`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Username tidak ada'))
                } else {
                    db.query(`SELECT *FROM user_privates where username='${username}'`, (error, result) => {
                        const isVerify = result[0].is_verify
                        if (isVerify === 0) {
                            console.log(error)
                            reject(new Error('Username tersebut belum di verifikasi, silahkan cek email terlebih dahulu'))
                        } else {
                            const passwordData = result[0].password
                            const comparePassword = bcryptjs.compareSync(password, passwordData)
                            if (comparePassword == false) {
                                reject(new Error('Password Salah'))
                            } else {
                                const data = result[0]
                                resolve(data)

                            }
                        }
                    })
                }
            })

        })
    },

    registerAuthentikasi: (username, password, email) => {
        return new Promise((resolve, reject) => {
            if (username === "" || password === "" || email === "") {
                reject(new Error('Field Tidak Boleh Kosong'))
            } else {
                db.query(`SELECT COUNT(*) as total FROM user_privates where username='${username}'`, (error, result) => {
                    const { total } = result[0]
                    if (total !== 0) {
                        reject(new Error('Username sudah digunakan'))
                    } else {
                        db.query(`INSERT INTO user_details (user_fullname) VALUES('${username}')`, (error, result) => {
                            if (error) {
                                reject(new Error('Salah pada saat membuat query di users_detail'))
                            } else {
                                db.query(`select max(id) as id from user_details`, (error, result) => {
                                    const maxId = result[0].id
                                    const encryptedPassword = bcryptjs.hashSync(password)
                                    const verify = uuid()
                                    db.query(`INSERT INTO user_privates (username,password,email,verify, id_user_detail) VALUES('${username}','${encryptedPassword}','${email}', '${verify}', ${maxId})`, (error, result) => {
                                        if (error) {
                                            console.log('sini')
                                            reject(new Error('Error database sistem'))
                                        } else {
                                            const data = `Username : ${username} sudah dibuat`
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
    }
}