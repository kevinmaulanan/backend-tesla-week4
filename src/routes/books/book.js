const books = require('express').Router()
const { getAllBooks, getBookById, getBooksByGenreId, getBooksByAuthorId, getPopularBooks, getBooksByList } = require('../../controller/get/books/books')
const { postBooks, postGenreBooks } = require('../../controller/post/books/books')

// Post method
books.post('/', postBooks)
books.post('/genre', postGenreBooks)

// Get method
books.get('/all', getAllBooks)
books.get('/popular', getPopularBooks)
books.get('/book/:id', getBookById)
books.get('/list/', getBooksByList)
books.get('/genre/:id', getBooksByGenreId)
books.get('/author/:id', getBooksByAuthorId)


module.exports = {
    books
}