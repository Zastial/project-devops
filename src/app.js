require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const setup = require('../fixtures/setup-db');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../public')))

app.use('/', require('./routes/form'));
app.use('/tickets', require('./routes/tickets'));


if (require.main === module) {
  setup().then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }).catch((err) => {
    console.error('Failed to set up the database:', err);
    process.exit(1);
  });
}

module.exports = app
