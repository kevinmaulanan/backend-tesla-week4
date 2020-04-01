const genre = require('express').Router()
const { postGenre } = require('../../controller/Post/genre/genre')


genre.post('/', postGenre)



module.exports = {
    genre
}