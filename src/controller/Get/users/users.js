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





module.exports = {
    getMyProfile
}