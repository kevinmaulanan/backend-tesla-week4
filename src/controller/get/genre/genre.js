const processGenre = require('../../../models/get/genre/genre')
const { paginate } = require('../../../pagination/pagination')


const getAllGenres = async (req, res) => {
    try {
        const { data, total } = await processGenre.getAllGenres(req)
        const pagination = paginate(req, 'genre', total)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Success to get all genres',
                data: data,
                pagination
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'Server error: Failed to get all genres'
            })
        }
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}



module.exports = {
    getAllGenres,
}