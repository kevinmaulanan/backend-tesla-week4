const db = require('../../../config/db')

module.exports = {

    postGenreBook: (nameGenre) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM genre where name_genre='${nameGenre}'`, (error, result) => {
                const { total } = result[0]
                if (total >= 1) {
                    reject(new Error('Genre Sudah Ada'))
                } else {

                    db.query(`INSERT INTO genre (name_genre) VALUES('${nameGenre}')`, (error, result) => {
                        if (error) {
                            reject(new Error('Erorr Disini'))
                        }
                        else {
                            result = `data dengan Genre Buku : '${nameGenre}' sudah ditambah`
                            resolve(result)
                        }
                    })
                }
            })

        })
    },
}