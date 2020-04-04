const processList = require('../../../models/get/list/list')

const getListByIdUserLogin = async (req, res) => {
    try {
        const idUserLogin = req.auth.id_user_detail
        const { idBook } = req.body
        console.log(idBook, 'IdBook')
        const dataList = await processList.getListByIdUserLogin(idUserLogin, idBook)
        if (dataList) {
            res.status(200).send({
                success: true,
                message: 'Berhasil',
                dataList
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
    getListByIdUserLogin
}
