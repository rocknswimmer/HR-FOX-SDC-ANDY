const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3003;

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'andy',
  host: 'localhost',
  database: 'qa',
  port: 5432,
});

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
  response.json({ info: 'Basic setup need to change get / route' });
});

// app.get('/qa/questions/test', (req, res) => {
//   let count = req.query.count || 5;
//   pool.query('select count(*) from questions', (err, data) => {
//     if (err) {
//       throw err;
//     }
//     console.log(data.rows[0].count);
//     res.send(data.rows);
//   });
// });

//get questions
app.get('/qa/questions/', (req, res) => {
  let count = req.query.count || 5;
  pool.query(`SELECT * FROM questions WHERE product_id = ${req.query.product_id} ORDER BY id LIMIT ${count}`, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.rows);
  });
});

//get answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let count = req.query.count || 5;
  pool.query(`SELECT * FROM answers WHERE question_id = ${req.params.question_id} ORDER BY id LIMIT ${count}`, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.rows);
  });
});

//post questions

app.post('/qa/questions/', (req, res) => {

  let { body, name, email, product_id } = req.body;
  let date = new Date().getTime();

  pool.query('select count(*) from questions', (err, data) => {
    if (err) {
      throw err;
    }
    let id = Number(data.rows[0].count) + 1;
    pool.query('INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [id, product_id, body, date, name, email, false, 0], (err, data) => {
      if (err) {
        throw err;
      }
      res.send(data.rows);
    });
  });
});

//post answers

app.post('/qa/questions/:question_id/answers', (req, res) => {

  let { body, name, email, photos } = req.body;
  let date = new Date().getTime();

  pool.query('select count(*) from answers', (err, data) => {
    if (err) {
      throw err;
    }
    let id = Number(data.rows[0].count) + 1;
    pool.query('INSERT INTO answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [id, req.params.question_id, body, date, name, email, false, 0], (err, data) => {
      if (err) {
        throw err;
      }
      res.send(data.rows);
    });
  });
});


//question helpful
app.put('/qa/questions/:question_id/helpful', (req, res) => {
       // should probably change if wanted to track # of reports but goint for simplicity first
  pool.query('UPDATE questions SET helpful = helpful + 1 WHERE id = $1 RETURNING helpful', [req.params.question_id ],  (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.rows);
  });
});

//report questions
app.put('/qa/questions/:question_id/report', (req, res) => {
       // should probably change if wanted to track # of reports but goint for simplicity first
  pool.query('UPDATE questions SET reported = $1 WHERE id = $2 RETURNING reported', [true, req.params.question_id ],  (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.rows);
  });
});

//answer helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
       // should probably change if wanted to track # of reports but goint for simplicity first
  pool.query('UPDATE answers SET helpful = helpful + 1 WHERE id = $1 RETURNING helpful', [req.params.answer_id ],  (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.rows);
  });
});

//report answers
app.put('/qa/answers/:answer_id/report', (req, res) => {
       // should probably change if wanted to track # of reports but goint for simplicity first
  pool.query('UPDATE answers SET reported = $1 WHERE id = $2 RETURNING reported', [true, req.params.answer_id ],  (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.rows);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});