const { db } = require('../../index')

db.query(
    `CREATE TABLE reviews (
      id INT PRIMARY KEY AUTO_INCREMENT,
      id_user INT,
      id_book INT,
      review TEXT,
      FOREIGN KEY(id_user) REFERENCES user_details(id) ON DELETE CASCADE,
      FOREIGN KEY(id_book) REFERENCES books(id) ON DELETE CASCADE
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('reviews table is created successfully')
    }
  )