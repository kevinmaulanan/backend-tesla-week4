const db = require('../../../config/db')

module.exports = {
    deleteMyFavoriteBook: (idUser, idBook) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM books_favorite_by_user WHERE id_user=${idUser} && id_book=${idBook}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error('Tidak ada buku favorite'))
                } else {
                    db.query(`DELETE FROM books_favorite_by_user WHERE id_user=${idUser} && id_book=${idBook}`, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            const data = `Favorite Books kamu sudah terhapus`
                            resolve(data)
                        }
                    })
                }
            })
        })
    }
}