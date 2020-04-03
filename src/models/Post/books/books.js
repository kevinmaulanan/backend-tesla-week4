const db = require('../../../config/db')

module.exports = {

    postBooks: (nameBook, descriptionBook, imageBook, idAuthor, totalReviews, avgRating) => {
        return new Promise((resolve, reject) => {
            console.log(idAuthor)
            db.query(`SELECT COUNT(*) as total FROM authors where id=${idAuthor}`, (error, result) => {
                const { total } = result[0]
                console.log('total', total)
                if (total < 1) {
                    reject(new Error('Tidak ada Author'))
                } else {
                    db.query(`INSERT INTO global_book_ratings (total_reviewers,avg_rating) VALUES(${totalReviews}, ${avgRating})`, (error, result) => {
                        if (error) {
                            reject(new Error('Kesalahan pada menginput global_book_ratings'))
                        } else {
                            db.query(`SELECT MAX(id) as id FROM global_book_ratings`, (error, result) => {
                                if (error) {
                                    reject(new Error('tidak ada maksimal id'))
                                } else {
                                    const maxId = result[0].id

                                    db.query(`INSERT INTO books (book_name,description,book_image,id_author,id_global_rating) VALUES('${nameBook}','${descriptionBook}','${imageBook}',${idAuthor},${maxId})`, (error, result) => {
                                        if (error) {
                                            console.log(error)
                                            reject(new Error('Erorr Pada Saat Input Buku'))
                                        }
                                        else {
                                            result = `data dengan Nama Buku : ${nameBook} sudah ditambahkan`
                                            resolve(result)
                                        }
                                    })
                                }
                            })
                        }
                    })


                }
            })

        })
    },

    postGenreBook: (idBook, idGenre) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM books where id= ${idBook}`, (error, result) => {
                const { total } = result[0]
                if (total < 1) {
                    reject(new Error(`Tidak ada Buku dengan id:${idBook} yang dipilih`))
                } else {
                    db.query(`SELECT COUNT(*) as total FROM genres where id= ${idGenre}`, (error, result) => {
                        const { total } = result[0]
                        if (total < 1) {
                            reject(new Error(`Tidak ada Genre dengan id :${idGenre} yang dipilih`))
                        } else {
                            db.query(`SELECT COUNT(*) as total FROM bridge_books_genres where id_book= ${idBook} && id_genre=${idGenre}`, (error, result) => {
                                const { total } = result[0]
                                if (total > 0) {
                                    reject(new Error('ID Genre sudah Ada'))
                                } else {
                                    db.query(`INSERT INTO bridge_books_genres (id_book,id_genre) VALUES(${idBook},${idGenre})`, (error, result) => {
                                        if (error) {
                                            console.log(error)
                                            reject(new Error('Kesalahan pada saat menginput data'))
                                        } else {
                                            result = `Genre dengan id: ${idGenre} sudah ditambahkan pada id Buku : ${idBook}`
                                            resolve(result)
                                        }
                                    })
                                }
                            })
                        }
                    })

                }
            })
        })
    }
}