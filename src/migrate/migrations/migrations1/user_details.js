const { db } = require('../../index')

db.query(
    `CREATE TABLE user_details (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_fullname VARCHAR(128),
      user_image VARCHAR(256)
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('users_detail table is created successfully')
    }
  )