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
// SELECT * FROM questions WHERE product_id = ${req.query.product_id} ORDER BY id LIMIT
//get questions
app.get('/qa/questions/', (req, res) => {
  let count = req.query.count || 5;
  pool.query(`select json_agg(questions) as results from (select id as question_id, body as question_body, date_written as question_date, asker_name, helpful as question_helpfulness, reported, (select json_agg(answers) from (select id as answer_id, body, date_written as date, answerer_name, helpful as helpfulness, (select json_agg(url) from photos where answer_id = answers.id) as photos from answers where question_id = questions.id and reported = false ORDER BY id) answers ) as answers from questions where product_id = ${req.query.product_id} and reported = false order by id limit ${count}) as questions;`, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.rows);
  });
});

//get answers
app.get('/qa/questions/:question_id/answers', (req, res) => {
  let count = req.query.count || 5;
  pool.query(`select json_agg(answers) as results from (select id as answer_id, body, date_written as date, answerer_name, helpful as helpfulness, (select array_agg(ph) from (select id, url from photos where answer_id = answers.id)ph ) as photos from answers where question_id = ${req.params.question_id} and reported = false ORDER BY id LIMIT ${count}) as answers;`, (err, data) => {
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

  pool.query('INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [product_id, body, date, name, email, false, 0], (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data.rows);
  });
});

//post answers

app.post('/qa/questions/:question_id/answers', (req, res) => {

  let { body, name, email, photos } = req.body;
  let date = new Date().getTime();

  pool.query(`INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (${req.params.question_id}, '${body}', '${date}', '${name}', '${email}', ${false}, ${Number(0)}) RETURNING id`)
   .then((data) => {
     if ((photos.length !== undefined) && (photos.length > 0)) {
       let promises = photos.map((photo) => (pool.query(`INSERT INTO photos (answer_id, url) VALUES (${data.rows[0].id}, '${photo}') RETURNING *`)));
       Promise.all(promises).then(() => { res.send(data.rows); }).catch((err) => { throw err })
     } else {
       res.send(data.rows);
     }
   }).catch((err) => {
    throw err;
   })
});




// pool.query('INSERT INTO photos (id, answer_id, "url") VALUES ($1, $2, $3) RETURNING *', [])

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