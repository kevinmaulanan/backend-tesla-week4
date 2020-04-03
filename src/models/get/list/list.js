const db = require('../../../config/db')

module.exports = {
    getListByIdUserLogin: (idUserLogin) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details WHERE id=${idUserLogin}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Tidak ada User yang login'))
                } else {
                    db.query(`SELECT lists.id, lists.id_user, lists.id_book, books.book_name, books.description, books.book_image, global_book_ratings.total_reviewers, global_book_ratings.avg_rating FROM lists JOIN books ON lists.id_book = books.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id WHERE id_user=${idUserLogin}`, (error, result) => {
                        if (error) {
                            reject(new Error('Kesalahan Query SELECT User'))
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
