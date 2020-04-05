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


const getBooksByGenreId = async (req, res) => {
    try {
        const id = req.params.id
        const { data, total } = await books.getBooksByGenreId(id, req)
        const pagination = paginate(req, `books/genre/${id}`, total)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Success to get books by genre',
                data,
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

const getBooksByAuthorId = async (req, res) => {
    try {
        const authorId = req.params.id
        const { data, total } = await books.getBooksByAuthorId(authorId, req)
        const pagination = paginate(req, `books/author/${authorId}`, total)
        if (data) {
            res.status(200).send({
                success: true,
                message: 'Success to get books by author id',
                data,
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

const getAllBooks = async (req, res) => {
    try {
        const { data, total } = await books.getAllBooks(req)
        const pagination = paginate(req, 'books/all', total)
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
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const getPopularBooks = async (req, res) => {
    try {
        const { data, total } = await books.getPopulerBooks(req)
        const pagination = paginate(req, 'books/popular', total)
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
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    getBooksByGenreId,
    getBooksByAuthorId,
    getPopularBooks,
}




