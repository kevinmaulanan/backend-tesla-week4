const author = require('express').Router()

const { getAllAuthors, getAuthorById, } = require('../../controller/Get/Author/author')
const { addAuthor } = require('../../controller/Post/author/author')

author.get('/', getAllAuthors)
author.post('/', addAuthor)
author.get('/:id', getAuthorById)

module.exports = {
    author
}