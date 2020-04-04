const db = require('../../../config/db')

module.exports = {
    getMyRatingByIdBook: (idUser, idBook) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM book_ratings_by_user WHERE id_user=${idUser} && id_book=${idBook}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Kamu Belum memberi Rating pada buku ini'))
                } else {
                    db.query(`SELECT book_ratings_by_user.id, books.book_name, user_details.user_fullname, user_details.user_image,book_ratings_by_user.rating FROM book_ratings_by_user JOIN books ON book_ratings_by_user.id_book=books.id JOIN user_details ON book_ratings_by_user.id_user=user_details.id WHERE book_ratings_by_user.id_user=${idUser} && book_ratings_by_user.id_book=${idBook}`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new Error('Kesalahan pada Query'))
                        } else {
                            const data = result
                            console.log('data', data)
                            resolve(data)
                        }
                    })
                }
            })
        })
    }
}