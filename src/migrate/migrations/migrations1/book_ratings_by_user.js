const { db } = require('../../index')

db.query(
    `CREATE TABLE book_ratings_by_user (
      id INT PRIMARY KEY AUTO_INCREMENT,
      id_user INT,
      id_book INT,
      rating INT,
      FOREIGN KEY (id_user) REFERENCES user_details(id) ON DELETE CASCADE ON UPDATE CASCADE,
      FOREIGN KEY (id_book) REFERENCES books(id) ON DELETE CASCADE ON UPDATE CASCADE
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('book_ratings_by_user table is created successfully')
    }
  )