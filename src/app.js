const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../public')))

const formRoutes = require('./routes/form').router
app.use('/', formRoutes)

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

module.exports = app
