const processReview = require('../../../models/get/review/review')
const { paginate } = require('../../../pagination/pagination')


const getAllReviewsByIdBook = async (req, res) => {
    try {
        const { idBook } = req.body
        const { data, total } = await processReview.getAllReviewsByIdBook(req, idBook)
        const pagination = paginate(req, 'review', total)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Berhasil',
                data,
                pagination
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
    getAllReviewsByIdBook
}