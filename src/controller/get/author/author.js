const processAuthors = require('../../../models/get/author/author')
const { paginate } = require('../../../pagination/pagination')


const getAllAuthors = async (req, res) => {
    try {
        const { data, total } = await processAuthors.getAllAuthors(req)
        const pagination = paginate(req, 'authors', total)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Success to get all authors',
                data: data,
                pagination
            })
        } else {
            res.status(500).send({
                success: false,
                message: 'Server error: Failed to get all authors'
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
        const id = req.params.id
        const dataAllAuthor = await processAuthors.getAuthorById(id)
        if (dataAllAuthor) {
            res.status(200).send({
                success: true,
                message: `Success to get author with id ${id}`,
                data: dataAllAuthor
            })
        } else {
            res.status(500).send({
                success: false,
                message: `Server error: Failed to get author with id ${id}`
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
