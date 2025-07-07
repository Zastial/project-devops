const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const Type = require('../models/type');

router.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Basic ')) return res.set('WWW-Authenticate', 'Basic').status(401).send('Auth required');
  const [user, pass] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASSWORD) {
    return res.set('WWW-Authenticate', 'Basic').status(401).send('Invalid credentials');
  }
  next();
});

router.get('/', async (req, res) => {
  const tickets = await Ticket.findAll({ include: Type });
  res.json(tickets);
});

module.exports = router;