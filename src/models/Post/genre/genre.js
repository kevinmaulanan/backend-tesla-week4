const db = require('../../../config/db')

module.exports = {

    postGenreBook: (nameGenre) => {
        return new Promise((resolve, reject) => {
            if (nameGenre == '') {
                reject(new Error('Field tidak boleh kosong'))
            }
            else {
                db.query(`SELECT COUNT(*) as total FROM genres where genre_name='${nameGenre}'`, (error, result) => {
                    const { total } = result[0]
                    if (total >= 1) {
                        reject(new Error(`Genre dengan nama :'${nameGenre}' Sudah Ada`))
                    } else {

                        db.query(`INSERT INTO genres (genre_name) VALUES('${nameGenre}')`, (error, result) => {
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
            }


        })
    },
}