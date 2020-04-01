const author = require('express').Router()

const { getAllAuthors, getAuthorById, } = require('../../controller/get/author/author')
const { addAuthor } = require('../../controller/post/author/author')

author.get('/', getAllAuthors)
author.post('/', addAuthor)
author.get('/:id', getAuthorById)

module.exports = {
    author
}