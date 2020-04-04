const list = require('express').Router()

const { addList } = require('../../controller/post/list/list')
const { deleteList } = require('../../controller/delete/list/list')
const { getListByIdUserLogin } = require('../../controller/get/list/list')

const { checkAuthToken } = require('../../middleware/auth/auth')

list.delete('/', checkAuthToken, deleteList)
list.get('/', checkAuthToken, getListByIdUserLogin)
list.post('/', checkAuthToken, addList)

module.exports = {
    list
}