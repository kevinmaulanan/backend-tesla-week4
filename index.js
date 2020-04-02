const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

// Import Middlewares
const path = require('path')
const cors = require('cors')

// Import Routes
const { auth } = require('./src/routes/auth/auth')
const { author } = require('./src/routes/author/author')
const { books } = require('./src/routes/books/book')
const { genre } = require('./src/routes/genre/genre')
const { review } = require('./src/routes/review/review')
const { users } = require('./src/routes/users/users')

const app = express()

// Use Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(cors())

// Register base routes
app.use('/auth', auth)
app.use('/author', author)
app.use('/books', books)
app.use('/genre', genre)
app.use('/review', review)
app.use('/users', users)

// Root page handler
app.get('/', (req, res) => {
    res.status(200).send('Server is Running')
})


app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`)
})