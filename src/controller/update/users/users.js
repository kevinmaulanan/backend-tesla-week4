const processUsers = require('../../../models/update/users/users')
const uploads = require('../../../multer/multer')

const updateMyProfile = async (req, res) => {
    try {
        await uploads(req, res, 'images')
        if (!req.file) {
            res.status(401).send({
                success: false,
                message: 'Tidak ada input file gambar'
            })
        }
        req.body.images = '/uploads/' + req.file.filename
        const dataImage = req.body.images
        const id = req.auth.id
        const { fullname } = req.body
        const data = await processUsers.updateProfile(id, fullname, dataImage)
        console.log(data)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Kesalahan pada query'
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
    updateMyProfile
}