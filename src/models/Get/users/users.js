const db = require('../../../config/db')

module.exports = {
    getMyProfile: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details WHERE id=${id}`, (error, result) => {
                const { total } = result[0]
                console.log(total)
                if (total !== 1) {
                    reject(new Error('Tidak ada user'))
                } else {
                    db.query(`SELECT user_privates.id, user_details.user_fullname, user_details.user_image, user_privates.email FROM user_details JOIN user_privates ON user_privates.id_user_detail = user_details.id WHERE user_privates.id=${id}`, (error, result) => {
                        if (error) {
                            reject(new Error('Kesalahan query'))
                        } else {
                            const data = result[0]
                            resolve(data)
                        }
                    })

                }
            })
        })
    }
}