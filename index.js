const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const { books } = require('./src/routes/books/book')
const { genre } = require('./src/routes/genre/genre')
const { author } = require('./src/routes/author/author')
const { authentikasi } = require('./src/routes/authentikasi/authentikasi')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/books', books)
app.use('/genre', genre)
app.use('/author', author)
app.use('/authentikasi', authentikasi)

app.get('/', (req, res) => {
    res.status(200).send('Server is Running')
})

app.listen(4444, () => {
    console.log('Server Running')
})