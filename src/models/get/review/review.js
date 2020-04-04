const db = require('../../../config/db')
const { paginationParams } = require('../../../pagination/pagination')

module.exports = {
    getAllReviewsByIdBook: (req, idBook) => {
        return new Promise((resolve, reject) => {
            const { conditions, paginate } = paginationParams(req)
            db.query(`SELECT COUNT(*) as total FROM books WHERE id=${idBook} ${conditions} AND books.is_deleted=0`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Buku not found'))
                } else {
                    db.query(`SELECT *FROM reviews WHERE id_book=${idBook} ${conditions} ${paginate}`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new Error('Kesalahan pada query getAllBook'))
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