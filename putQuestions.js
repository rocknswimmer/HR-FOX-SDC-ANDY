const Pool = require('pg').Pool
const pool = new Pool({
  user: 'andy',
  host: 'localhost',
  database: 'qa',
  port: 5432,
})

export const putQuestions = {
  helpful: (req, res) => {

  }
}