const db = require('../../../config/db')

module.exports = {
    getAuthorById: (id) => {
        console.log(id)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS total FROM authors WHERE id= ${id}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Not found'))
                } else {
                    db.query(`SELECT * FROM authors WHERE id=${id}`, (error, result) => {
                        if (error) {
                            reject(new Error('Server error: Failed to get author'))
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
            db.query(`SELECT * FROM authors`, (error, result) => {
                if (error) {
                    reject(new error('Server error: Failed to get all authors'))
                } else {
                    const data = result
                    resolve({ data })
                }
            })
        })
    },
}
