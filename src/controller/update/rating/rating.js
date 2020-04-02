const processRating = require('../../../models/update/rating/rating')

const updateRating = async (req, res) => {
    try {
        const idUserLogin = req.auth.id_user_detail
        const { idBook, rating } = req.body
        const data = await processRating.updateRatingByUserLogin(idUserLogin, idBook, rating)
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
    updateRating
}