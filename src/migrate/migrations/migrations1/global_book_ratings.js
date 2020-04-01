import { db } from '../../index'

db.query(
    `CREATE TABLE global_book_ratings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      total_reviewers INT,
      avg_rating DECIMAL(3,2)
    );`,
    (error, results, fields) => {
      if (error) throw error
      else console.log('global_book_ratings table is created successfully')
    }
  )