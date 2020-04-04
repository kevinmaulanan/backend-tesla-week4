const processList = require('../../../models/post/list/list')

const addList = async (req, res) => {
    try {
        const idUser = req.auth.id_user_detail
        const { idBook, nameList } = req.body
        console.log(idUser)
        console.log(idBook)
        console.log(nameList)
        const data = await processList.addListByIdUser(idUser, idBook, nameList)

        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada Kesalahan'
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
    addList
}
