const processReview = require('../../../models/update/review/review')

const updateReview = async (req, res) => {
    try {
        const idUserLogin = req.auth.id_user_detail
        const { idBook, review } = req.body
        const data = await processReview.updateReviewByUserLogin(idUserLogin, idBook, review)
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
    updateReview
}