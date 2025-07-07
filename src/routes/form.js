const express = require('express')
const path = require('path')
const db = require('../db/database')
const { validateForm } = require('../validation')

const router = express.Router()

router.get('/', (req, res) => {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname, '../../public/index.html'))
})

async function insertDB(conn, name, email) {
  try {
    // Check if user already exists with this email
    const [existing] = await conn.query(
      'SELECT * FROM submissions WHERE email = ?',
      [email]
    )
    if (existing) {
      return { exists: true, user: existing }
    }
    await conn.query(
      'INSERT INTO submissions (name, email) VALUES (?, ?)',
      [name, email]
    )
    return { exists: false }
  } catch (err) {
    console.error('Erreur lors de l\'insertion dans la base de données:', err)
    throw err
  }
}

router.post('/submit', async (req, res) => {
  const { name, email } = req.body
  if (!validateForm({ name, email })) {
    return res.status(400).send('Champs invalides')
  }
  let conn
  try {
    conn = await db.getConnection()
    await insertDB(conn, name, email)
    res.redirect('/submissions')
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement:', err)
    res.status(500).send('Erreur lors de l\'enregistrement')
  } finally {
    if (conn) conn.release()
  }
})

router.get('/submissions', async (req, res) => {
  let conn
  try {
    conn = await db.getConnection()
    const rows = await conn.query('SELECT * FROM submissions')
    let html = '<h1>Soumissions</h1><ul>'
    rows.forEach(row => {
      html += `<li>${row.name} (${row.email})</li>`
    })
    html += '</ul><a href="/">Retour au formulaire</a>'
    res.send(html)
  } catch (err) {
    console.error('Erreur lors de la récupération:', err)
    res.status(500).send('Erreur lors de la récupération')
  } finally {
    if (conn) conn.release()
  }
})

module.exports = {
  router,
  insertDB
}