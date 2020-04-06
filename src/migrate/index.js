const mysql = require('mysql')
require('dotenv').config()

const db = mysql.createConnection({
  host: process.env.DB_SERVER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true
})

db.connect(() => console.log('Database Connected'))

function  migrate() {
  db.query(
    `
      CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};
      USE ${process.env.DB_NAME};
    `
  , (error, results, fields) => {
    if (error) console.log(error)
    else console.log('Success to create database')
  })

  require('./migrations/migrations1/user_privates')
  require('./migrations/migrations1/user_details')
  require('./migrations/migrations1/alterusers')
  require('./migrations/migrations1/authors')
  require('./migrations/migrations1/genres')
  require('./migrations/migrations1/global_book_ratings')
  require('./migrations/migrations1/books')
  require('./migrations/migrations1/book_ratings_by_user')
  require('./migrations/migrations1/books_favorite_by_user')
  require('./migrations/migrations1/lists')
  require('./migrations/migrations1/reviews')
  require('./migrations/migrations1/bridge_books_genres')

  db.end()
}

module.exports = { db }

migrate()