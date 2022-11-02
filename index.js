const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3003

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Basic setup need to change get / route' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})