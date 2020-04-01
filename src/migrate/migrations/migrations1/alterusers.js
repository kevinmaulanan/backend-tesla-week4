import { db } from '../../index'

db.query(
    `
      ALTER TABLE user_privates
      ADD FOREIGN KEY(id_user_detail)
      REFERENCES user_details(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    `,
    (error, results, fields) => {
      if (error) throw error
      else console.log('Altering users_private table is success')
    }
  )