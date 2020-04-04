const db = require('../../../config/db')

module.exports = {
    deleteMyReview: (idUser, idBook) => {
        return new Promise((resolve, reject) => {

            db.query(`SELECT COUNT(*) as total FROM reviews WHERE id_user=${idUser} && id_book=${idBook}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error('Kamu belum memberi Reviews di Buku ini'))
                } else {
                    db.query(`DELETE FROM reviews WHERE id_user=${idUser} && id_book=${idBook}`, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            const data = `Reviews kamu sudah terhapus`
                            resolve(data)
                        }
                    })
                }
            })
        })
    }
}