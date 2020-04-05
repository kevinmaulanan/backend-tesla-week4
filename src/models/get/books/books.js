const db = require('../../../config/db')
const { paginationParams } = require('../../../pagination/pagination')

module.exports = {

    getAllBooks: (req) => {
        const { conditions, paginate } = paginationParams(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT books.id, books.book_name, books.description, books.book_image, global_book_ratings.total_reviewers, global_book_ratings.avg_rating, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id ${conditions} AND books.is_deleted=0`, (error, result) => {
                const total = result !== undefined ? result.length : 0
                if (error) {
                    reject(new Error('Server error: Failed to get all books'))
                } else {
                    db.query(`SELECT books.id, books.book_name, books.description, books.book_image,global_book_ratings.total_reviewers, global_book_ratings.avg_rating, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id ${conditions} AND books.is_deleted=0 ${paginate}`, (error, result) => {
                        if (error) {
                            reject(new Error('Server error: Failed to get all books'))
                        } else {
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
                    db.query(`SELECT books.id, books.book_name, books.description, books.book_image,global_book_ratings.total_reviewers, global_book_ratings.avg_rating, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id WHERE books.id=${id} AND books.is_deleted=0 `, (error, result) => {
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

    getBooksByList: (req, nameList) => {
        console.log(nameList)
        const { paginate, conditions } = paginationParams(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM lists WHERE list_name='${nameList}' `, (error, result) => {
                console.log(result)
                const { total } = result[0]
                if (total < 1 || total == undefined) {
                    reject(new Error(`Name List : ${nameList} is not found `))
                }
                else {
                    db.query(`SELECT lists.id, lists.id_book, books.book_name, books.description, books.book_image, global_book_ratings.total_reviewers, global_book_ratings.avg_rating,  lists.list_name FROM books JOIN global_book_ratings ON books.id_global_rating = global_book_ratings.id JOIN lists ON lists.id_book=books.id WHERE lists.list_name = '${nameList}'  ${paginate}`, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            const data = result
                            resolve({ data, total })
                        }
                    })
                }
            })

        })
    },

    getBooksByGenreId: (id, req) => {
        const { conditions, paginate } = paginationParams(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT books.id, books.book_name, books.description, books.book_image,global_book_ratings.total_reviewers, global_book_ratings.avg_rating, genres.genre_name, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN bridge_books_genres ON books.id= bridge_books_genres.id_book JOIN genres ON bridge_books_genres.id_genre=genres.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id ${conditions} AND genres.id=${id} && books.is_deleted=0`, (error, result) => {
                if (error) reject(error)
                const total = result.length
                if (total < 1) {
                    reject(new Error(`ID Genre : ${id} is not found `))
                }
                else {
                    db.query(`SELECT books.id, books.book_name, books.description, books.book_image,global_book_ratings.total_reviewers, global_book_ratings.avg_rating, genres.genre_name, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN bridge_books_genres ON books.id= bridge_books_genres.id_book JOIN genres ON bridge_books_genres.id_genre=genres.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id ${conditions} AND genres.id=${id} && books.is_deleted=0 ${paginate}`, (error, result) => {
                        if (error) {
                            reject(error)
                        } else {
                            const data = result
                            resolve({ data, total })
                        }
                    })
                }
            })

        })
    },

    getBooksByAuthorId: (authorId, req) => {
        const { conditions, paginate } = paginationParams(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT books.id, books.book_name, books.description, books.book_image,global_book_ratings.total_reviewers, global_book_ratings.avg_rating, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id ${conditions} AND authors.id=${authorId} && books.is_deleted=0 `, (error, result) => {
                if (error) reject(error)
                const total = result.length
                if (total < 1) {
                    reject(new Error(`Author with id ${authorId} is not found`))
                }
                else {
                    db.query(`SELECT books.id, books.book_name, books.description, books.book_image,global_book_ratings.total_reviewers, global_book_ratings.avg_rating, authors.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id ${conditions} AND authors.id=${authorId} && books.is_deleted=0 ${paginate}`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new Error(`Server error: Failed to get books by lists`))
                        } else {
                            const data = result
                            resolve({ data, total })
                        }
                    })
                }
            })
        })
    },

    getPopulerBooks: (req) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM books`, (error, result) => {
                console.log(result[0])
                const { total } = result[0]
                if (total === 0) {
                    reject(new Error('Tidak ada Buku'))
                } else {
                    db.query(`SELECT books.id, books.book_name, books.description, books.book_image, global_book_ratings.avg_rating FROM books JOIN global_book_ratings ON books.id_global_rating = global_book_ratings.id ORDER BY global_book_ratings.avg_rating DESC LIMIT 10`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new Error('Kesalahan pada saat Query Books All'))
                        } else {
                            const data = result
                            resolve({ data, total })
                        }

                    })
                }
            })


        })
    }
}
