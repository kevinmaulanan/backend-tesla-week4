const books = require('express').Router()
const { allBooks, idBooks, idGenreBooks, idAuthorBooks } = require('../../controller/books/Get/books')
const { postBooks, postGenreBooks } = require('../../controller/books/Post/books')

books.post('/', postBooks)
books.post('/genre', postGenreBooks)

books.get('/all', allBooks)
books.get('/book/:id', idBooks)
books.get('/genre/:id', idGenreBooks)
books.get('/author/:id', idAuthorBooks)


module.exports = {
    books
}