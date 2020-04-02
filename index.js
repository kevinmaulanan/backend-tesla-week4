const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const path = require('path')
const cors = require('cors')

const { authentikasi } = require('./src/routes/authentikasi/authentikasi')
const { author } = require('./src/routes/author/author')
const { books } = require('./src/routes/books/book')
const { genre } = require('./src/routes/genre/genre')
const { review } = require('./src/routes/review/review')
const { users } = require('./src/routes/users/users')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())


app.use('/author', author)
app.use('/authentikasi', authentikasi)
app.use('/books', books)
app.use('/genre', genre)
app.use('/review', review)
app.use('/users', users)

app.get('/', (req, res) => {
    res.status(200).send('Server is Running')
})

app.listen(4444, () => {
    console.log('Server Running')
})