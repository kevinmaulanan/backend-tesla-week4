const books = require('../../../models/get/books/books')
const { paginate } = require('../../../pagination/pagination')

const idBooks = async (req, res) => {
    try {
        const id = req.params.id
        const dataidBooks = await books.getIdBooks(id)
        console.log(dataidBooks)
        if (dataidBooks) {
            res.status(200).send({
                success: true,
                message: 'berhasil',
                data: dataidBooks
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada kesalahan'
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


const idGenreBooks = async (req, res) => {
    try {
        const id = req.params.id
        const dataidGenre = await books.getIdGenreBooks(id)
        if (dataidGenre) {
            res.status(200).send({
                success: true,
                message: 'berhasil',
                data: dataidGenre
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada kesalahan'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const idAuthorBooks = async (req, res) => {
    try {
        const idAuthor = req.params.id
        const dataidGenre = await books.getIdAuthorBooks(idAuthor)
        if (dataidGenre) {
            res.status(200).send({
                success: true,
                message: 'berhasil',
                data: dataidGenre
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada kesalahan'
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const allBooks = async (req, res) => {
    try {
        const { data, total } = await books.getAllBooks(req)
        const pagination = paginate(req, 'books', total)
        console.log(pagination)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'berhasil dibuat',
                data,
                pagination,
            })
        } else {
            res.status(401).send({
                success: false,
                message: 'Ada kesalahan'
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
    allBooks,
    idBooks,
    idGenreBooks,
    idAuthorBooks,
}




