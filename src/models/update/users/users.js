const db = require('../../../config/db')

module.exports = {
    updateProfile: (id, fullname, dataImage) => {
        return new Promise((resolve, reject) => {
            if (fullname == '') {
                reject(new Error('Fullname Harus diisi'))
            } else {
                console.log('hmm')
                console.log(id, fullname, dataImage)
                db.query(`SELECT COUNT(*) as total FROM user_details WHERE id=${id}`, (error, result) => {
                    const { total } = result[0]
                    if (total !== 1) {
                        reject(new Error('Tidak ada User yang seperti itu'))
                    } else {
                        db.query(`UPDATE user_details SET user_fullname='${fullname}', user_image='${dataImage}' WHERE id=${id}`, (error, result) => {
                            console.log(result)
                            if (error) {
                                reject(new Error('kesahalahan pada saat menginput data'))
                            } else {
                                const data = 'User berhasil di update'
                                resolve(data)
                            }
                        })
                    }
                })
            }


        })
    }
}