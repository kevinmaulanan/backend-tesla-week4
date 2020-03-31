const db = require('../../../config/db')

module.exports = {

    getAllBooks: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT books.id, books.name_book, list.name_list, books.description_book, genre.name_genre, athor.name_author FROM books JOIN athor ON books.id_author=athor.id JOIN bridge_books_genre ON books.id= bridge_books_genre.id_books JOIN genre ON bridge_books_genre.id_genre=genre.id JOIN list ON books.id_list=list.id where books.on_delete=0 `, (error, result) => {
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
                    db.query(`SELECT books.id, books.name_book, list.name_list, books.description_book, genre.name_genre, athor.name_author FROM books JOIN athor ON books.id_author=athor.id JOIN bridge_books_genre ON books.id= bridge_books_genre.id_books JOIN genre ON bridge_books_genre.id_genre=genre.id JOIN list ON books.id_list=list.id where books.id=${id} && books.on_delete=0 `, (error, result) => {
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
                    db.query(`SELECT books.id, books.name_book, list.name_list, books.description_book, genre.name_genre, athor.name_author FROM books JOIN athor ON books.id_author=athor.id JOIN bridge_books_genre ON books.id= bridge_books_genre.id_books JOIN genre ON bridge_books_genre.id_genre=genre.id JOIN list ON books.id_list=list.id where genre.id=${id} && books.on_delete=0 `, (error, result) => {
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
                    db.query(`SELECT books.id, books.name_book, list.name_list, books.description_book, genre.name_genre, athor.name_author FROM books JOIN athor ON books.id_author=athor.id JOIN bridge_books_genre ON books.id= bridge_books_genre.id_books JOIN genre ON bridge_books_genre.id_genre=genre.id JOIN list ON books.id_list=list.id where books.id_author=${idAuthor} && books.on_delete=0 `, (error, result) => {
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