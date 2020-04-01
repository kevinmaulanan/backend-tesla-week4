const db = require('../../../config/db')

module.exports = {
    getAuthorById: (id) => {
        console.log(id)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total from authors where id= ${id}`, (error, result) => {
                const { total } = result[0]

                if (total !== 1) {
                    reject(new Error('Id author tidak ditemukan'))
                } else {
                    db.query(`SELECT *FROM authors where id=${id}`, (error, result) => {
                        if (error) {
                            reject(new Error('kesalahan query'))
                        } else {
                            const data = result
                            resolve(data)
                        }
                    })
                }
            })
        })
    },


    getAllAuthors: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT *FROM authors`, (error, result) => {
                if (error) {
                    reject(new error('kesalahan query'))
                } else {
                    const data = result
                    resolve({ data })
                }
            })

        })
    },
}