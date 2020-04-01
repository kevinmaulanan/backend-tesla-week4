import { db } from '../../index'

db.query(
    `CREATE TABLE lists (
      id INT PRIMARY KEY AUTO_INCREMENT,
      id_user INT,
      id_book INT,
      list_name VARCHAR(128),
      FOREIGN KEY(id_user) REFERENCES user_details(id) ON DELETE CASCADE,
      FOREIGN KEY(id_book) REFERENCES books(id) ON DELETE CASCADE
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('lists table is created successfully')
    }
  )