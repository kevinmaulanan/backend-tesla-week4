const processUsers = require('../../../models/get/users/users')

const getMyProfile = async (req, res) => {
    try {
        const id = req.auth.id
        const data = await processUsers.getMyProfile(id)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Profile berhasil di tampilkan',
                data: data
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'Not found'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getMyFavoriteBook = async (req, res) => {
    try {
        const idUser = req.auth.id_user_detail
        const data = await processUsers.getMyFavoriteBook(idUser)
        console.log(data)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Buku Favorite berhasil ditampilkan',
                data: data
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
    getMyProfile,
    getMyFavoriteBook
}
