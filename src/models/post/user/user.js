const db = require('../../../config/db')

module.exports = {
    addFavoriteBook: (idUser, idBook) => {
        return new Promise((resolve, reject) => {
            console.log(idBook)
            db.query(`SELECT COUNT(*) as total FROM books WHERE id=${idBook} `, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Buku tidak ada'))
                }
                else {
                    db.query(`SELECT COUNT(*) as total FROM books_favorite_by_user WHERE id_book=${idBook} && id_user=${idUser}`, (error, result) => {
                        const { total } = result[0]
                        if (total !== 0) {
                            reject(new Error('Buku sudah ada di Favorite'))
                        } else {
                            db.query(`INSERT INTO books_favorite_by_user(id_book,id_user) VALUES(${idBook},${idUser})`, (error, result) => {
                                if (error) {
                                    reject(new Error('Error Query Database'))
                                } else {
                                    const data = 'Buku sudah ditambahkan ke Favorite'
                                    resolve(data)
                                }
                            })
                        }
                    })
                }
            })

        })

    }
}