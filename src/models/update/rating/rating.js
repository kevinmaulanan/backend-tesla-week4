const db = require('../../../config/db')

module.exports = {
    updateRatingByUserLogin: (idUserLogin, idBook, rating) => {
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
                            db.query(`SELECT *FROM book_ratings_by_user where id_user=${idUserLogin} && id_book=${idBook}`, (error, result) => {
                                if (error) {
                                    reject(new Error('Kesalahan pada Query'))
                                } else {
                                    const ratingUserPast = result[0].rating
                                    db.query(`UPDATE book_ratings_by_user SET rating=${rating}`, (error, result) => {
                                        if (error) {
                                            reject(new Error('Kesalahan pada Query'))
                                        } else {
                                            db.query(`SELECT *FROM global_book_ratings where id=${idBook}`, (error, result) => {
                                                if (error) {
                                                    reject(new Error('Kesalahan pada Query global_Book'))
                                                } else {
                                                    totalReviews = result[0].total_reviewers
                                                    avgRating = result[0].avg_rating
                                                    const hasilAvgRating = (((totalReviews * avgRating) + (ratingUserPast - rating)) / totalReviews)
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
                                            const data = `Berhasil memberikan rating menjadi ${rating}`
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