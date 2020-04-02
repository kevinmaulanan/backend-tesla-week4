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

// Root page handler
app.get('/', (req, res) => {
    res.status(200).send('Server is Running')
})

// Register base routes
app.use('/auth', auth)
app.use('/author', author)
app.use('/books', books)
app.use('/genre', genre)
app.use('/review', review)
app.use('/users', users)


// Error handling
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})
  
  
// Catch the error
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`)
})