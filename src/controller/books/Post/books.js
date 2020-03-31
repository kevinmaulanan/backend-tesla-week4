const books = require('../../../models/books/Post/books')


const postBooks = async (req, res) => {
    try {
        const { nameBook, descriptionBook, idAuthor, idList } = req.body
        const dataPostBooks = await books.postBooks(nameBook, descriptionBook, idAuthor, idList)
        if (dataPostBooks) {
            res.status(200).send({
                success: true,
                message: dataPostBooks,
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada kesalahan'
            })
        }
    } catch (error) {
        res.status(202).send({
            success: false,
            message: error.message
        })
    }
}

const postGenreBooks = async (req, res) => {
    try {
        const { idBook, idGenre } = req.body
        const dataPostGenre = await books.postGenreBook(idBook, idGenre)
        if (dataPostGenre) {
            res.status(200).send({
                success: true,
                message: dataPostGenre,
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada kesalahan'
            })
        }
    } catch (error) {
        res.status(202).send({
            success: false,
            message: error.message
        })
    }
}




module.exports = {
    postBooks,
    postGenreBooks,
}