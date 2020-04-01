const processAuthors = require('../../../models/Get/Author/author')


const getAllAuthors = async (req, res) => {
    try {
        const dataAllAuthor = await processAuthors.getAllAuthors()
        if (dataAllAuthor) {
            res.status(200).send({
                success: true,
                message: 'Data Author berhasil ditampilkan',
                data: dataAllAuthor
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'kesalahan pada sistem Author'
            })
        }

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}

const getAuthorById = async (req, res) => {
    try {
        const id = req.body
        const dataAllAuthor = await processAuthors.getAuthorById(id)
        if (dataAllAuthor) {
            res.status(200).send({
                success: true,
                message: 'Data Author berhasil ditampilkan',
                data: dataAllAuthor
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'kesalahan pada sistem Author'
            })
        }

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    getAllAuthors,
    getAuthorById,
}