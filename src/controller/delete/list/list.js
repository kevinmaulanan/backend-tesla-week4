const processList = require('../../../models/delete/list/list')

const deleteList = async (req, res) => {
    try {
        const idUserLogin = req.auth.id_user_detail

        const { idBook, idList } = req.body
        const data = await processList.deleteList(idUserLogin, idBook, idList)
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
    deleteList
}
