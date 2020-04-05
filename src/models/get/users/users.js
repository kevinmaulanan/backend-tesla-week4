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
    },

    getMyFavoriteBook: (idUser) => {
        return new Promise((resolve, reject) => {

            db.query(`SELECT COUNT(*) as total FROM books_favorite_by_user WHERE id_user=${idUser}`, (error, result) => {
                const { total } = result[0]
                if (total === 0) {
                    reject(new Error('Tidak ada Buku Favorite'))
                } else {
                    db.query(`SELECT books_favorite_by_user.id_book, books.book_name, books.description, books.book_image FROM books_favorite_by_user JOIN books ON books_favorite_by_user.id_book = books.id JOIN user_details ON books_favorite_by_user.id_user = user_details.id WHERE books_favorite_by_user.id_user=${idUser}`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new Error('Error Query Database'))
                        } else {
                            const data = result
                            resolve(data)
                        }
                    })
                }
            })
        })

    }
}
