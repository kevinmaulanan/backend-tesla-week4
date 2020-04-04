const processRating = require('../../../models/get/rating/rating')



const getRatingsByIdUser = async (req, res) => {
    try {
        const idUser = req.auth.id_user_detail
        const { idBook } = req.body
        const data = await processRating.getMyRatingByIdBook(idUser, idBook)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Berhasil',
                data,
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'Not Found'
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
    getRatingsByIdUser
}