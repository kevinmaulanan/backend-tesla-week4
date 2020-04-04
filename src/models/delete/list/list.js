const db = require('../../../config/db')

module.exports = {
    deleteList: (idUserLogin, idBook, idList) => {
        console.log(idUserLogin, idBook, idList)
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details WHERE id=${idUserLogin}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('User Login Not Found'))
                } else {
                    db.query(`SELECT COUNT(*) as total FROM books WHERE id=${idBook}`, (error, result) => {
                        const { total } = result[0]
                        if (total !== 1) {
                            reject(new Error('Tidak ada buku yang dipilih'))
                        } else {
                            db.query(`SELECT COUNT(*) as total FROM lists WHERE id_user=${idUserLogin} && id_book=${idBook} && id=${idList}`, (error, result) => {
                                const { total } = result[0]
                                if (total !== 1) {
                                    reject(new Error('Tidak ada List yang dipilih'))
                                } else {
                                    db.query(`DELETE FROM lists WHERE id_user=${idUserLogin} && id_book=${idBook} && id=${idList}`, (error, result) => {
                                        if (error) {
                                            reject(new Error('Server Error'))
                                        } else {
                                            const data = `List Sudah Terhapus`
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