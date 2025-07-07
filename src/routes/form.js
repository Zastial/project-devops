const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const Type = require('../models/type');

router.get('/', async (req, res) => {
  const types = await Type.findAll();
  res.render('form', { types });
});

router.post('/', async (req, res) => {
  const { ticket_type, email, message } = req.body;

  let typeId;
  await Type.findOne({
    where: { name: ticket_type },
  }).then((type) => {
    if (type) {
      typeId = type.id;
    } else {
      return res.status(400).send('Type de ticket invalide');
    }
  });

  await Ticket.create({ TypeId: typeId, email, message });
  res.send('Ticket soumis !');
});

module.exports = router;