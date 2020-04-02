const db = require('../../../config/db')
const { paginationParams } = require('../../../pagination/pagination')

module.exports = {

    getAllBooks: (req) => {
        const { conditions, paginate } = paginationParams(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS total FROM books ${conditions} `, (error, result) => {
                const { total } = result[0]
                if (error) {
                    reject(new Error('Server error: Failed to get all books'))
                } else {
                    db.query(`SELECT books.id, books.book_name, books.description, global_book_ratings.total_reviewers, global_book_ratings.avg_rating, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id ${conditions} AND books.is_deleted=0 ${paginate}`, (error, result) => {
                        if (error) {
                            reject(new Error('Server error: Failed to get all books'))
                        } else {
                            console.log('result', result)
                            const data = result
                            resolve({ data, total })
                        }
                    })
                }
            })

        })
    },


    getBookById: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS total FROM books WHERE id=${id}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error(`ID : ${id} is not found `))
                } else {
                    db.query(`SELECT books.id, books.book_name, books.description, global_book_ratings.total_reviewers, global_book_ratings.avg_rating, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id WHERE books.id=${id} AND books.is_deleted=0 `, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            const data = result[0]
                            db.query(`
                                SELECT genres.genre_name 
                                FROM genres 
                                WHERE genres.id IN (
                                    SELECT bridge_books_genres.id_genre
                                    FROM bridge_books_genres
                                    WHERE bridge_books_genres.id_book = ${db.escape(id)}
                                );`, (error, result) => {
                                    if (error) reject(error)
                                    else resolve({
                                        ...data,
                                        genres: result.map(item => item.genre_name)
                                    })
                                })
                        }
                    })
                }
            })

        })
    },

    getBooksByGenreId: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total from bridge_books_genres where id_genre=${id}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error(`ID Genre : ${id} is not found `))
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


    getBooksByAuthorId: (authorId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total from books where id_author=${authorId}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error(`Author with id ${authorId} is not found`))
                }
                else {
                    db.query(`SELECT books.id, books.book_name, books.description, global_book_ratings.total_reviewers, global_book_ratings.avg_rating, genres.genre_name, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN bridge_books_genres ON books.id= bridge_books_genres.id_book JOIN genres ON bridge_books_genres.id_genre=genres.id JOIN lists ON books.id=lists.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id WHERE authors.id=${authorId} && books.is_deleted=0 `, (error, result) => {
                        if (error) {
                            reject(new Error(`Server error: Failed to get books by author`))
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