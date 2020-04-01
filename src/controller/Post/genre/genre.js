const genre = require('../../../models/Post/genre/genre')

const postGenre = async (req, res) => {
    try {
        const { nameGenre } = req.body
        const dataPostGenre = await genre.postGenreBook(nameGenre)
        if (dataPostGenre) {
            res.status(200).send({
                success: true,
                message: dataPostGenre,
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada kesalahan'
            })
        }
    } catch (error) {
        res.status(202).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    postGenre
}