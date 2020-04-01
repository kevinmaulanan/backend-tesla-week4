const { db } = require('../../index')

db.query(
    `CREATE TABLE genres (
      id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
      genre_name VARCHAR(128)
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('genres table is created successfully')
    }
  )