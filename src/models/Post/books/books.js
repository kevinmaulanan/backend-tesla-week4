const db = require('../../../config/db')

module.exports = {

    postBooks: (nameBook, descriptionBook, idAuthor, idList) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM books where id_author=${idAuthor}`, (error, result) => {
                const { total } = result[0]
                console.log('total', total)
                if (total < 1) {
                    reject(new Error('Tidak ada Author'))
                } else {
                    db.query(`SELECT COUNT(*) as total FROM books where id_list=${idList}`, (error, result) => {
                        const { total } = result[0]
                        if (total < 1) {
                            reject(new Error('Tidak ada list'))
                        } else {
                            db.query(`INSERT INTO books (name_book,description_book,id_author,id_list) VALUES('${nameBook}','${descriptionBook}',${idAuthor},${idList})`, (error, result) => {
                                if (error) {
                                    reject(new Error('Erorr Disini'))
                                }
                                else {
                                    result = `data dengan Nama Buku : ${nameBook}`
                                    resolve(result)
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
                    reject(new Error('Tidak ada Buku yang dipilih'))
                } else {
                    db.query(`SELECT COUNT(*) as total FROM bridge_books_genre where id_books= ${idBook} && id_genre=${idGenre}`, (error, result) => {
                        const { total } = result[0]
                        if (total > 0) {
                            reject(new Error('ID Genre sudah Ada'))
                        } else if (total < 0) {
                            reject(new Error('ID Genre tidak ditemukan'))
                        } else {
                            db.query(`INSERT INTO bridge_books_genre(id_books,id_genre) VALUES(${idBook},${idGenre})`, (error, result) => {
                                if (error) {
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
        })
    }
}