const review = require('express').Router()
console.log('reviews', review)

const { addReview } = require('../../controller/post/review/review')
const { updateReview } = require('../../controller/update/review/review')

const { checkAuthToken } = require('../../middleware/auth/auth')

review.post('/', checkAuthToken, addReview)
review.patch('/', checkAuthToken, updateReview)

module.exports = {
    review
}