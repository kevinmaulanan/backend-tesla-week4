const processUser = require('../../../models/post/user/user')

const addFavoriteBook = async (req, res) => {
    try {
        const idUser = req.auth.id_user_detail
        const { idBook } = req.body
        const data = await processUser.addFavoriteBook(idUser, idBook)
        console.log(data)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
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
    addFavoriteBook,

}