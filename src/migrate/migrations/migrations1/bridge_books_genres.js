import { db } from '../../index'

db.query(
    `CREATE TABLE bridge_books_genres (
      id INT PRIMARY KEY AUTO_INCREMENT,
      id_book INT,
      id_genre INT,
      FOREIGN KEY (id_book) REFERENCES books(id) ON DELETE CASCADE,
      FOREIGN KEY (id_genre) REFERENCES genres(id) ON DELETE CASCADE
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('bridge_books_genres is created successfully')
    }
  )