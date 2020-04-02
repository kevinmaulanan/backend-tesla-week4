const db = require('../../../config/db')

module.exports = {
    addRatingByUserLogin: (idUserLogin, idBook, rating) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT COUNT(*) as total FROM user_details where id=${idUserLogin}`, (error, result) => {
                const { total } = result[0]
                if (total !== 1) {
                    reject(new Error('Tidak ada user yang login'))
                } else {
                    db.query(`SELECT COUNT(*) as total FROM books where id=${idBook}`, (error, result) => {
                        const { total } = result[0]
                        if (total !== 1) {
                            reject(new Error('Tidak ada Buku yang dipilih'))
                        } else {
                            db.query(`SELECT COUNT(*) as total FROM book_ratings_by_user where id_book=${idBook} && id_user=${idUserLogin}`, (error, result) => {
                                const { total } = result[0]
                                if (total !== 0) {
                                    reject(new Error('Anda sudah memberi rating di buku ini'))
                                } else {
                                    db.query(`INSERT INTO book_ratings_by_user (id_user,id_book,rating) VALUES(${idUserLogin},${idBook},${rating})`, (error, result) => {
                                        if (error) {

                                            reject(new Error('Kesalahan pada Query'))
                                        } else {
                                            db.query(`SELECT *FROM global_book_ratings where id=${idBook}`, (error, result) => {
                                                if (error) {
                                                    reject(new Error('Kesalahan pada Query global_Book'))
                                                } else {
                                                    totalReviews = result[0].total_reviewers
                                                    totalReviewsNow = result[0].total_reviewers + 1
                                                    avgRating = result[0].avg_rating
                                                    const hasilAvgRating = (((totalReviews * avgRating) + rating) / totalReviewsNow)
                                                    console.log(hasilAvgRating)
                                                    db.query(`UPDATE global_book_ratings SET total_reviewers=${totalReviewsNow}, avg_rating=${hasilAvgRating}  WHERE id=${idBook} `, (error, result) => {
                                                        if (error) {
                                                            console.log(error)
                                                            reject(new Error('Kesalahan pada Query'))
                                                        } else {
                                                            const data = `Berhasil Mengupdate Review`
                                                            resolve(data)
                                                        }
                                                    })
                                                }
                                            })
                                            const data = `Berhasil memberikan rating ${rating} kepada buku ini`
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