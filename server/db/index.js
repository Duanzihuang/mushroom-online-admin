const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mushroom_online'
})

const executeSql = (sql, params) => {
  return new Promise((resolve, reject) => {
    try {
      pool.query(sql, params, function (error, results, fields) {
        if (error) {
          return reject(error)
        }

        resolve(results)
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  executeSql
}
