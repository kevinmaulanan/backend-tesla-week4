const { db } = require('../../index')

db.query(
    `CREATE TABLE user_privates (
      id INT PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(64),
      password VARCHAR(128),
      email VARCHAR(64),
      verification_code VARCHAR(128),
      is_verified TINYINT DEFAULT 0,
      id_user_detail INT
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('users_private table is created successfully')
    }
  )