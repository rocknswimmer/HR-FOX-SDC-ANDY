const Pool = require('pg').Pool
const pool = new Pool({
  user: 'andy',
  host: 'localhost',
  database: 'qa',
  port: 5432,
})

export const getQuestions = {
  get: (req, res) => {
    pool.query(`SELECT * FROM questions WHERE product_id = ${req.query.product_id} ORDER BY id LIMIT ${req.query.count}`, (err, data) => {
      if (err) {
        throw error;
      }
      console.log(data);
      res.send(data.rows);
    })
  }
}