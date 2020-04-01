import { db } from '../../index'

db.query(
    `CREATE TABLE books (
      id INT PRIMARY KEY AUTO_INCREMENT,
      book_name VARCHAR(128),
      description TEXT,
      book_image VARCHAR(256),
      id_author INT,
      id_global_rating INT,
      FOREIGN KEY (id_author) REFERENCES authors(id) ON DELETE CASCADE,
      FOREIGN KEY (id_global_rating) REFERENCES global_book_ratings(id) ON DELETE CASCADE
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('books table is created successfully')
    }
  )