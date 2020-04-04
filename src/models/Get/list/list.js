const db = require('../../../config/db')

module.exports = {
    getListByIdUserLogin: (idUserLogin, idBook) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details WHERE id=${idUserLogin}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Kamu Belum Login'))
                } else {
                    console.log(idBook)
                    db.query(`SELECT COUNT(*) as total FROM books WHERE id=${idBook}`, (error, result) => {
                        const { total } = result[0]
                        console.log(total)
                        if (total !== 1) {
                            reject(new Error('Buku yang dicari Tidak ada'))
                        } else {
                            console.log('masuk')
                            db.query(`SELECT list_name FROM lists WHERE id_user=${idUserLogin} && id_book=${idBook}`, (error, result) => {
                                if (error) {
                                    reject(new Error('Kesalahan Query SELECT User'))
                                } else {
                                    const dataList = result
                                    db.query(`SELECT books.id, lists.id_user, lists.id_book,lists.list_name, books.book_name, books.description, books.book_image, global_book_ratings.total_reviewers, global_book_ratings.avg_rating FROM lists JOIN books ON lists.id_book = books.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id WHERE books.id=${idBook}`, (error, result) => {
                                        if (error) {
                                            console.log(error)
                                            reject(new Error('Server Error'))
                                        } else {
                                            const dataBook = result[0]
                                            resolve({
                                                ...dataBook,
                                                lists: dataList.map(list => list.list_name)
                                            })

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