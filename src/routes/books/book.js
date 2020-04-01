const books = require('express').Router()
const { allBooks, idBooks, idGenreBooks, idAuthorBooks } = require('../../controller/Get/Books/books')
const { postBooks, postGenreBooks } = require('../../controller/Post/books/books')

books.post('/', postBooks)
books.post('/genre', postGenreBooks)

books.get('/all', allBooks)
books.get('/book/:id', idBooks)
books.get('/genre/:id', idGenreBooks)
books.get('/author/:id', idAuthorBooks)


module.exports = {
    books
}