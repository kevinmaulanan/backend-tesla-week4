const rating = require('express').Router()

const { addRating } = require('../../controller/post/rating/rating')
const { updateRating } = require('../../controller/update/rating/rating')
const { checkAuthToken } = require('../../Middleware/auth/auth')

rating.post('/', checkAuthToken, addRating)
rating.patch('/', checkAuthToken, updateRating)
module.exports = {
    rating
}