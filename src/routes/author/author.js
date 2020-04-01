const author = require('express').Router()

const { getAllAuthors, getAuthorById } = require('../../controller/Get/Author/author')

author.get('/', getAllAuthors)
author.get('/:id', getAllAuthors)

module.exports = {
    author
}