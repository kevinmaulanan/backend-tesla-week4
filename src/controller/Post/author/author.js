const processAuthor = require('../../../models/post/author/author')

const addAuthor = async (req, res) => {

    try {
        const { nameAuthor, imageAuthor } = req.body
        const data = await processAuthor.addAuthors(nameAuthor, imageAuthor)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Gagal membuat Author'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    addAuthor,
}