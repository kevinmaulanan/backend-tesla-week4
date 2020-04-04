const processFavoriteBook = require('../../../models/delete/user/user')

const deleteMyFavoriteBook = async (req, res) => {
    try {
        const idUser = req.auth.id_user_detail
        const { idBook } = req.body
        const data = await processFavoriteBook.deleteMyFavoriteBook(idUser, idBook)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'Error Delete Your FavoriteBook'
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
    deleteMyFavoriteBook
}