const db = require('../../../config/db')
const { paginationParams } = require('../../../pagination/pagination')

module.exports = {
    getAuthorById: (id) => {

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


    getAllAuthors: (req) => {
        console.log('hm')
        return new Promise((resolve, reject) => {
            const { paginate, conditions } = paginationParams(req)
            db.query(`SELECT COUNT(*) as total FROM authors ${conditions}`, (error, result) => {
                const { total } = result[0]
                console.log(total)
                if (error) {
                    console.log(error)
                    reject(new Error('Server error: Failed to get all authors'))
                } else {
                    db.query(`SELECT * FROM authors ${conditions}${paginate}`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new error('Server error: Failed to get all authors'))
                        } else {
                            const data = result
                            console.log(data)
                            console.log(total)
                            resolve({ data, total })
                        }
                    })
                }
            })

        })
    },
}