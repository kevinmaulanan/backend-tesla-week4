const db = require('../../../config/db')
const { paginationParams } = require('../../../pagination/pagination')

module.exports = {
    getAllGenres: (req) => {
        return new Promise((resolve, reject) => {
            const { paginate, conditions } = paginationParams(req)
            db.query(`SELECT COUNT(*) as total FROM genres ${conditions}`, (error, result) => {
                const { total } = result[0]
                console.log(total)
                if (error) {
                    console.log(error)
                    reject(new Error('Server error: Failed to get all genres'))
                } else {
                    db.query(`SELECT * FROM genres ${conditions}${paginate}`, (error, result) => {
                        if (error) {
                            console.log(error)
                            reject(new error('Server error: Failed to get all genres'))
                        } else {
                            const data = result
                            resolve({ data, total })
                        }
                    })
                }
            })

        })
    },
}