const list = require('express').Router()
const { addList } = require('../../controller/post/list/list')
const { getListByIdUserLogin } = require('../../controller/get/list/list')
const { checkAuthToken } = require('../../Middleware/auth/auth')

list.get('/', checkAuthToken, getListByIdUserLogin)
list.post('/', checkAuthToken, addList)

module.exports = {
    list
}