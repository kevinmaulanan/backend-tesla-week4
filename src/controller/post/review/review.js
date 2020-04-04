const processReview = require('../../../models/post/review/review')

const addReview = async (req, res) => {
    try {
        const idUserLogin = req.auth.id_user_detail
        const { idBook, review } = req.body
        const data = await processReview.addReviewByUserLogin(idUserLogin, idBook, review)
        if (data) {
            res.status(200).send({
                success: false,
                message: data
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Kesalahan saat menginput data'
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    addReview
}
