const processList = require('../../../models/get/list/list')

const getListByIdUserLogin = async (req, res) => {
    try {
        const idUserLogin = req.auth.id_user_detail
        const data = await processList.getListByIdUserLogin(idUserLogin)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada kesalahan pada Sistem'
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
    getListByIdUserLogin
}