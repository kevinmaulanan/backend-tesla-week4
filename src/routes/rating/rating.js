const rating = require('express').Router()

const { addRating } = require('../../controller/post/rating/rating')
const { getRatingsByIdUser } = require('../../controller/get/rating/rating')
const { updateRating } = require('../../controller/update/rating/rating')
const { checkAuthToken } = require('../../middleware/auth/auth')

rating.post('/', checkAuthToken, getRatingsByIdUser)
rating.post('/', checkAuthToken, addRating)
rating.patch('/', checkAuthToken, updateRating)
module.exports = {
    rating
}