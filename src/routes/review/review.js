const review = require('express').Router()
console.log('reviews', review)

const { addReview } = require('../../controller/post/review/review')
const { deleteMyReview } = require('../../controller/delete/review/review')
const { getAllReviewsByIdBook } = require('../../controller/get/review/review')
const { updateReview } = require('../../controller/update/review/review')

const { checkAuthToken } = require('../../middleware/auth/auth')

review.delete('/', checkAuthToken, deleteMyReview)
review.get('/', checkAuthToken, getAllReviewsByIdBook)
review.patch('/', checkAuthToken, updateReview)
review.post('/', checkAuthToken, addReview)

module.exports = {
    review
}