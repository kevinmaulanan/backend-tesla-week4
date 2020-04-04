const users = require('express').Router()

const { getMyProfile, getMyFavoriteBook } = require('../../controller/get/users/users')
const { addFavoriteBook } = require('../../controller/post/user/user')
const { updateMyProfile } = require('../../controller/update/users/users')
const { deleteMyFavoriteBook } = require('../../controller/delete/user/user')
const { checkAuthToken } = require('../../middleware/auth/auth')


users.delete('/my-favorite-book', checkAuthToken, deleteMyFavoriteBook)
users.get('/', checkAuthToken, getMyProfile)
users.get('/my-favorite-book', checkAuthToken, getMyFavoriteBook)
users.patch('/', checkAuthToken, updateMyProfile)
users.post('/my-favorite-book', checkAuthToken, addFavoriteBook)

module.exports = {
    users
}