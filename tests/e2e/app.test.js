const request = require('supertest');
const app = require('../../src/app');
const db = require('../../src/database');
const Type = require('../../src/models/type');
const Ticket = require('../../src/models/ticket');

let testTypeName = 'Bug';
let testTypeId;

beforeAll(async () => {
  // S'assurer que le type existe ou le créer
  let type = await Type.findOne({ where: { name: testTypeName } });
  if (!type) {
    type = await Type.create({ name: testTypeName });
  }
  testTypeId = type.id;
});

afterAll(async () => {
  try {
    // Nettoyer les tickets de test
    await Ticket.destroy({ where: { email: 'test@example.com' } });
  } catch (err) {
    console.error('Erreur lors du nettoyage des tickets de test :', err);
  }

  if (typeof db.close === 'function') {
    await db.close();
  } else if (typeof db.end === 'function') {
    await db.end();
  }
});

describe('Tickets End-to-End', () => {
  it('GET / should return the form HTML with types', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('<form');
    expect(res.text).toContain(testTypeName);
  });

  it('POST / with valid data should create a ticket', async () => {
    const res = await request(app)
      .post('/')
      .send(`ticket_type=${testTypeName}&email=test@example.com&message=Test message`)
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Ticket soumis !');

    // Optionnel : vérifier en base que le ticket a bien été créé
    const ticket = await Ticket.findOne({ where: { email: 'test@example.com' } });
    expect(ticket).not.toBeNull();
    expect(ticket.message).toBe('Test message');
  });

  it('POST / with invalid ticket_type should return 400', async () => {
    const res = await request(app)
      .post('/')
      .send('ticket_type=INVALID&email=test@example.com&message=Test message')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Type de ticket invalide');
  });

  it('GET /tickets without auth should return 401', async () => {
    const res = await request(app).get('/tickets');
    expect(res.statusCode).toBe(401);
    expect(res.headers['www-authenticate']).toBeDefined();
  });

  it('GET /tickets with valid Basic auth should return JSON list', async () => {
    const authHeader = 'Basic ' + Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASSWORD}`).toString('base64');

    const res = await request(app)
      .get('/tickets')
      .set('Authorization', authHeader);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Vérifie qu’au moins un ticket a été soumis (celui du test)
    expect(res.body.some(t => t.email === 'test@example.com')).toBe(true);
  });
});
