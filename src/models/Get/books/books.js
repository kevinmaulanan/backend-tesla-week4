const db = require('../../../config/db')

module.exports = {

    getAllBooks: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT books.id, books.book_name, books.book_image, list.list_name, books.description, genre.name_genre, author.author_name FROM books JOIN authors ON books.id_author=authors.id JOIN bridge_books_genres ON books.id= bridge_books_genres.id_books JOIN genres ON bridge_books_genres.id_genre=genres.id JOIN lists ON books.id_list=lists.id where books.is_deleted=0 `, (error, result) => {
                if (error) {
                    reject(error)
                } else {
                    const data = result
                    resolve(data)
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
                    db.query(`SELECT books.id, books.name_book, list.name_list, books.description_book, genre.name_genre, author.name_author FROM books JOIN author ON books.id_author=author.id JOIN bridge_books_genre ON books.id= bridge_books_genre.id_books JOIN genre ON bridge_books_genre.id_genre=genre.id JOIN list ON books.id_list=list.id where books.id=${id} && books.on_delete=0 `, (error, result) => {
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
            db.query(`SELECT COUNT(*) as total from bridge_books_genre where id_genre=${id}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error(`ID Genre : ${id} tidak ditemukan `))
                }
                else {
                    db.query(`SELECT books.id, books.name_book, list.name_list, books.description_book, genre.name_genre, author.name_author FROM books JOIN author ON books.id_author=author.id JOIN bridge_books_genre ON books.id= bridge_books_genre.id_books JOIN genre ON bridge_books_genre.id_genre=genre.id JOIN list ON books.id_list=list.id where genre.id=${id} && books.on_delete=0 `, (error, result) => {
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
                    db.query(`SELECT books.id, books.name_book, list.name_list, books.description_book, genre.name_genre, author.name_author FROM books JOIN author ON books.id_author=author.id JOIN bridge_books_genre ON books.id= bridge_books_genre.id_books JOIN genre ON bridge_books_genre.id_genre=genre.id JOIN list ON books.id_list=list.id where books.id_author=${idAuthor} && books.on_delete=0 `, (error, result) => {
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