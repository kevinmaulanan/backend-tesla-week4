const express = require('express')
const bodyParser = require('body-parser')

const { books } = require('./src/routes/books/book')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/books', books)

app.get('/', (req, res) => {
    res.status(200).send('Server is Running')
})

app.listen(4444, () => {
    console.log('Server Running')
})