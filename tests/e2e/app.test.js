const request = require('supertest')
const app = require('../../src/app')
const db = require('../../src/db/database')

afterAll(async () => {
  let conn = await db.getConnection()
  if (conn) {
    try {
      await conn.query('DELETE FROM submissions where email = ?', ['test@example.com'])
    } catch (err) {
      console.error('Erreur lors de la suppression de la table:', err)
    } finally {
      conn.release()
    }
  }
  if (db.end) await db.end()
  
})

describe('Form End-to-End', () => {
  it('GET / should return the form HTML', async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('<form')
  })

  it('POST /submit with invalid data should return 400', async () => {
    const res = await request(app)
      .post('/submit')
      .send('name=&email=')
      .set('Content-Type', 'application/x-www-form-urlencoded')
    expect(res.statusCode).toBe(400)
  })

  it('POST /submit with valid data should redirect', async () => {
    const res = await request(app)
      .post('/submit')
      .send('name=Test&email=test@example.com')
      .set('Content-Type', 'application/x-www-form-urlencoded')
    expect(res.statusCode).toBe(302)
    expect(res.headers.location).toBe('/submissions')
  })

  it('GET /submissions should return submissions list', async () => {
    const res = await request(app).get('/submissions')
    expect(res.statusCode).toBe(200)
    expect(res.text).toContain('Soumissions')
  })
})
