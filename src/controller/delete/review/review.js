const processReview = require('../../../models/delete/review/review')

const deleteMyReview = async (req, res) => {
    try {
        const idUser = req.auth.id_user_detail
        const { idBook } = req.body
        const data = await processReview.deleteMyReview(idUser, idBook)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'Error Delete Your Review'
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
    deleteMyReview
}