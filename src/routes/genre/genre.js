const genre = require('express').Router()
const { postGenre } = require('../../controller/post/genre/genre')


genre.post('/', postGenre)



module.exports = {
    genre
}