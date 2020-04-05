const processList = require('../../../models/get/list/list')
const { paginate } = require('../../../pagination/pagination')

const getAllList = async (req, res) => {
    try {
        const { data, total } = await processList.getAllList(req)
        console.log(data)
        const pagination = paginate(req, `list/list`, total)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Berhasil',
                data,
                pagination
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'Not foundd'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getListByIdUserLogin = async (req, res) => {
    try {
        const idUserLogin = req.auth.id_user_detail
        const { idBook } = req.body
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


const getAllListByIdUserLogin = async (req, res) => {
    try {
        const idUserLogin = req.auth.id_user_detail
        const { dataBook, total } = await processList.getAllListByIdUserLogin(idUserLogin)
        console.log(dataBook)
        const pagination = paginate(req, `list/all`, total)
        if (dataBook) {
            res.status(200).send({
                success: true,
                message: 'Berhasil',
                dataBook,
                pagination
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
    getListByIdUserLogin,
    getAllListByIdUserLogin,
    getAllList
}
