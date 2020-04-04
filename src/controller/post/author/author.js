const processAuthor = require('../../../models/post/author/author')
const uploads = require('../../../multer/multer')


const addAuthor = async (req, res) => {
    try {
        await uploads(req, res, 'images')
        if (!req.file) {
            res.status(401).send({
                success: false,
                message: 'Tidak ada input file gambar'
            })
        }
        console.log(req.file)
        req.body.images = '/uploads/' + req.file.filename
        const dataImage = req.body.images

        const { nameAuthor } = req.body
        const data = await processAuthor.addAuthor(nameAuthor, dataImage)
        if (data) {
            res.status(200).send({
                success: true,
                message: data
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Failed to add author'
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
    addAuthor
}
