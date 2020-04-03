const db = require('../../../config/db')

module.exports = {
    addListByIdUser: (idUser, idBook, nameList) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details where id=${idUser}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error(`Tidak ada User dengan id:${idUser}`))
                } else {
                    db.query(`SELECT COUNT(*) as total FROM books where id=${idBook}`, (error, result) => {
                        const { total } = result[0]
                        if (total !== 1) {
                            reject(new Error(`Tidak ada Buku dengan id:${idBook}`))
                        } else {
                            db.query(`SELECT COUNT(*) as total FROM lists WHERE id_user=${idUser} && id_book=${idBook} && list_name='${nameList}'`, (error, result) => {
                                const { total } = result[0]
                                if (total !== 0) {
                                    reject(new Error(`List '${nameList}' sudah dipakai oleh anda. Silahkan tambhakan yang lain`))
                                } else {
                                    db.query(`INSERT INTO lists (id_user, id_book, list_name) VALUES(${idUser}, ${idBook}, '${nameList}')`, (error, result) => {
                                        if (error) {
                                            console.log(error)
                                            reject(new Error('Salah Di Input Query List'))
                                        } else {
                                            const data = `List '${nameList}'  sudah ditambahakan`
                                            resolve(data)
                                        }
                                    })
                                }
                            })

                        }
                    })
                }
            })
        })

    }
}
