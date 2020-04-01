const db = require('../../../config/db')

module.exports = {
    addAuthors: (nameAuthors, imageAuthor) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM authors WHERE author_name='${nameAuthors}'`, (error, result) => {
                const { total } = result[0]
                if (total !== 0) {
                    reject(new Error(`Author dengan nama :${nameAuthors} sudah ada`))
                } else {
                    db.query(`INSERT INTO authors(author_name,author_image) VALUES('${nameAuthors}' , '${imageAuthor}')`, (error, result) => {
                        if (error) {
                            reject(new Error('Kesalahan pada Query'))
                        } else {
                            const data = `Author dengan nama : ${nameAuthors} sudah ditambahkan`
                            resolve(data)
                        }
                    })
                }
            })
        })
    }
}