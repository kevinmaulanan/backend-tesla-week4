const genre = require('express').Router()
const { postGenre } = require('../../controller/post/genre/genre')
const { getAllGenres } = require('../../controller/get/genre/genre')


genre.get('/', getAllGenres)
genre.post('/', postGenre)



module.exports = {
    genre
}