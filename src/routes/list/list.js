const list = require('express').Router()

const { addList } = require('../../controller/post/list/list')
const { deleteList } = require('../../controller/delete/list/list')
const { getListByIdUserLogin, getAllListByIdUserLogin, getAllList } = require('../../controller/get/list/list')

const { checkAuthToken } = require('../../middleware/auth/auth')

list.delete('/', checkAuthToken, deleteList)
list.get('/', checkAuthToken, getListByIdUserLogin)
list.get('/list', checkAuthToken, getAllList)
list.get('/all', checkAuthToken, getAllListByIdUserLogin)
list.post('/', checkAuthToken, addList)

module.exports = {
    list
}