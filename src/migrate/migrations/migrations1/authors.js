const { db } = require('../../index')

db.query(
    `CREATE TABLE authors (
      id INT PRIMARY KEY AUTO_INCREMENT,
      author_name VARCHAR(128) UNIQUE,
      author_image VARCHAR(256)
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('authors table is created successfully')
    }
  )