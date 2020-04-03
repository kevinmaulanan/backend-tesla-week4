const db = require('../../../config/db')

module.exports = {
    addReviewByUserLogin: (idUserLogin, idBook, review) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details where id=${idUserLogin}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Tidak ada user yang login'))
                } else {
                    db.query(`SELECT COUNT(*) as total FROM books where id=${idBook}`, (error, result) => {
                        const { total } = result[0]
                        if (total !== 1) {
                            reject(new Error('Tidak ada Buku yang dipilih'))
                        } else {
                            db.query(`SELECT COUNT(*) as total FROM reviews where id_book=${idBook} && id_user=${idUserLogin}`, (error, result) => {
                                const { total } = result[0]
                                if (total !== 0) {
                                    reject(new Error('Anda sudah memberi riviews di buku ini'))
                                } else {
                                    db.query(`INSERT INTO reviews (id_user,id_book,review) VALUES(${idUserLogin},${idBook},'${review}')`, (error, result) => {
                                        if (error) {
                                            console.log(error)
                                            reject(new Error('Kesalahan pada Query'))
                                        } else {
                                            const data = `Berhasil memberikan Review`
                                            resolve(data)
                                        }
                                    })
                                }
                            })

                        }
                    })
                }
            })
        })
    }
}
