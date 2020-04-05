const db = require('../../../config/db')
const { paginationParams } = require('../../../pagination/pagination')

module.exports = {

    getAllList: (req) => {
        const { conditions, paginate } = paginationParams(req)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(DISTINCT list_name) as total FROM lists ${conditions}`, (error, result) => {
                const { total } = result[0]
                if (total == 0) {
                    reject(new Error('Tidak ada List'))
                } else {
                    db.query(`SELECT DISTINCT list_name  FROM lists ${conditions} ${paginate}`, (error, result) => {
                        const data = result
                        if (error) {
                            reject(new Error('Error Query'))
                        }
                        else {
                            resolve({ data, total })
                        }
                    })
                }
            })
        })


    },

    getListByIdUserLogin: (idUserLogin, idBook) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details WHERE id=${idUserLogin}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Kamu Belum Login'))
                } else {
                    db.query(`SELECT COUNT(*) as total FROM books WHERE id=${idBook}`, (error, result) => {
                        const { total } = result[0]
                        console.log(total)
                        if (total !== 1) {
                            reject(new Error('Buku yang dicari Tidak ada'))
                        } else {
                            db.query(`SELECT COUNT(*) as total FROM lists WHERE id_user=${idUserLogin} && id_book=${idBook}`, (error, result) => {
                                const { total } = result[0]
                                console.log('total', total)
                                if (total == 0) {
                                    reject(new Error('Tidak ada list'))
                                } else {
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
                }
            })
        })
    },

    getAllListByIdUserLogin: (idUserLogin) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details WHERE id=${idUserLogin}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Kamu Belum Login'))
                } else {
                    db.query(`SELECT COUNT(DISTINCT id_book) as total FROM lists WHERE id_user=${idUserLogin}`, (error, result) => {
                        const { total } = result[0]
                        console.log('totallll', total)
                        if (total == 0) {
                            reject(new Error('Tidak ada list'))
                        } else {
                            db.query(`SELECT DISTINCT books.id, lists.id_user, lists.id_book, books.book_name, books.description, books.book_image, global_book_ratings.total_reviewers, global_book_ratings.avg_rating FROM lists JOIN books ON lists.id_book = books.id JOIN global_book_ratings ON books.id_global_rating=global_book_ratings.id`, (error, result) => {
                                if (error) {
                                    console.log(error)
                                    reject(new Error('Server Error'))
                                } else {
                                    const dataBook = result


                                    resolve({
                                        dataBook, total
                                    })

                                }
                            })
                        }
                    })
                }
            })
        })
    },


}
