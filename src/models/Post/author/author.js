const db = require('../../../config/db')

module.exports = {
    addAuthor: (nameAuthor, imageAuthor) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) AS total FROM authors WHERE author_name='${nameAuthor}'`, (error, result) => {
                const { total } = result[0]
                if (total !== 0) {
                    reject(new Error(`Author with name ${nameAuthor} is already exist`))
                } else {
                    db.query(`INSERT INTO authors(author_name,author_image) VALUES('${nameAuthor}' , '${imageAuthor}')`, (error, result) => {
                        if (error) {
                            reject(new Error('Server error: Failed to add author'))
                        } else {
                            const data = `Author with name ${nameAuthor} is added`
                            resolve(data)
                        }
                    })
                }
            })
        })
    }
}