const books = require('../../../models/get/books/books')
const { paginate } = require('../../../pagination/pagination')

const getBookById = async (req, res) => {
    try {
        const id = req.params.id
        const bookData = await books.getBookById(id)
        if (bookData) {
            res.status(200).send({
                success: true,
                message: `Success to get book with id ${id}`,
                data: bookData
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'Not found'
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


const getBookByGenreId = async (req, res) => {
    try {
        const id = req.params.id
        const booksData = await books.getBooksByGenreId(id)
        if (booksData) {
            res.status(200).send({
                success: true,
                message: 'Success to get books by genre',
                data: booksData
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

const getBooksByAuthorId = async (req, res) => {
    try {
        const authorId = req.params.id
        const booksData = await books.getBooksByAuthorId(authorId)
        console.log(booksData)
        if (booksData) {
            res.status(200).send({
                success: true,
                message: 'Success to get books by author id',
                data: booksData
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

const getAllBooks = async (req, res) => {
    try {
        const { data, total } = await books.getAllBooks(req)
        const pagination = paginate(req, 'books', total)
        console.log(pagination)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Success to get all books',
                data,
                pagination,
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'Not found'
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
    getAllBooks,
    getBookById,
    getBookByGenreId,
    getBooksByAuthorId,
}




