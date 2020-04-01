const db = require('../../../config/db')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')


module.exports = {
    loginAuthentikasi: (username, password) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM users_privat where username='${username}'`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Username not found'))
                } else {
                    db.query(`SELECT FROM users_privat where username='${username}`, (error, result) => {
                        if (error) {
                            reject(new Error('Ada yang salah di sistem login'))
                        } else {
                            const passwordData = result[0].password
                            const comparePassword = bcryptjs.compareSync(password, passwordData)
                            if (comparePassword == false) {

                            }
                        }
                    })
                }
            })

        })
    }
}