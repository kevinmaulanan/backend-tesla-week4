const users = require('express').Router()

const { getMyProfile } = require('../../controller/get/users/users')
const { updateMyProfile } = require('../../controller/update/users/users')
const { checkAuthToken } = require('../../middleware/auth/auth')

users.get('/', checkAuthToken, getMyProfile)
users.patch('/', checkAuthToken, updateMyProfile)

module.exports = {
    users
}