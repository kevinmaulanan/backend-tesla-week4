const db = require('../../../config/db')
const { paginationParams } = require('../../../pagination/pagination')

module.exports = {

    getAllBooks: (req) => {
        const { conditions, paginate } = paginationParams(req)
        console.log(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM books ${conditions} `, (error, result) => {
                const { total } = result[0]
                if (error) {
                    reject(new Error('Kesalahan!!!'))
                } else {
                    db.query(`SELECT books.id, books.book_name, lists.list_name, books.description, global_book_ratings.total_reviewers, global_book_ratings.avg_rating,genres.genre_name, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN bridge_books_genres ON books.id= bridge_books_genres.id_book JOIN genres ON bridge_books_genres.id_genre=genres.id JOIN lists ON books.id=lists.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id ${conditions} AND books.is_deleted=0 ${paginate}`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new Error('Kesalahan pada saat Konfigurasi'))
                        } else {
                            const data = result
                            resolve({ data, total })
                        }
                    })
                }
            })

        })
    },


    getIdBooks: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total from books where id=${id}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error(`ID : ${id} tidak ditemukan `))
                } else {
                    db.query(`SELECT books.id, books.book_name, lists.list_name, books.description, global_book_ratings.total_reviewers, global_book_ratings.avg_rating,genres.genre_name, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN bridge_books_genres ON books.id= bridge_books_genres.id_book JOIN genres ON bridge_books_genres.id_genre=genres.id JOIN lists ON books.id=lists.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id WHERE books.id=${id} && books.is_deleted=0 `, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            const data = result
                            resolve(data)
                        }
                    })
                }
            })

        })
    },

    getIdGenreBooks: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total from bridge_books_genres where id_genre=${id}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error(`ID Genre : ${id} tidak ditemukan `))
                }
                else {
                    db.query(`SELECT books.id, books.book_name, lists.list_name, books.description, global_book_ratings.total_reviewers, global_book_ratings.avg_rating,genres.genre_name, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN bridge_books_genres ON books.id= bridge_books_genres.id_book JOIN genres ON bridge_books_genres.id_genre=genres.id JOIN lists ON books.id=lists.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id WHERE genres.id=${id} && books.is_deleted=0 `, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {

                            const data = result
                            console.log('data', data)
                            resolve(data)
                        }
                    })
                }
            })

        })
    },


    getIdAuthorBooks: (idAuthor) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total from books where id_author=${idAuthor}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error(`Author dengan id: ${idAuthor} tidak ditemukan `))
                }
                else {
                    db.query(`SELECT books.id, books.book_name, lists.list_name, books.description, global_book_ratings.total_reviewers, global_book_ratings.avg_rating,genres.genre_name, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN bridge_books_genres ON books.id= bridge_books_genres.id_book JOIN genres ON bridge_books_genres.id_genre=genres.id JOIN lists ON books.id=lists.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id WHERE authors.id=${idAuthor} && books.is_deleted=0 `, (error, result) => {
                        if (error) {
                            reject(new Error(`Query False`))
                        } else {
                            const data = result
                            resolve(data)
                        }
                    })
                }
            })

        })
    },
}