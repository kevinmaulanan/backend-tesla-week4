const db = require('../../../config/db')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const uuid = require('uuid').v1


module.exports = {
    loginAuthentikasi: (username, password) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM users_privat where username='${username}'`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Username tidak ada'))
                } else {
                    db.query(`SELECT *FROM users_privat where username='${username}'`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new Error('Ada yang salah di sistem login'))
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
                db.query(`SELECT COUNT(*) as total FROM users_privat where username='${username}'`, (error, result) => {
                    const { total } = result[0]
                    if (total !== 0) {
                        reject(new Error('Username sudah digunakan'))
                    } else {
                        db.query(`INSERT INTO users_detail (name_user) VALUES('${username}')`, (error, result) => {
                            if (error) {
                                reject(new Error('Salah pada saat membuat query di users_detail'))
                            } else {
                                db.query(`select max(id) as id from users_detail`, (error, result) => {
                                    const maxId = result[0].id
                                    const encryptedPassword = bcryptjs.hashSync(password)
                                    const verify = uuid()
                                    db.query(`INSERT INTO users_privat (username,password,email,verify, id_user_details) VALUES('${username}','${encryptedPassword}','${email}', '${verify}', ${maxId})`, (error, result) => {
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