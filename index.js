const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3003

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'andy',
  host: 'localhost',
  database: 'qa',
  port: 5432,
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Basic setup need to change get / route' })
})

app.get('/qa/questions/', (req, res) => {
  pool.query(`SELECT * FROM questions WHERE product_id = ${req.query.product_id} ORDER BY id LIMIT ${req.query.count}`, (err, data) => {
    if (err) {
      throw error;
    }
    console.log(data);
    res.send(data.rows);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})