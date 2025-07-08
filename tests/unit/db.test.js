const Ticket = require('../../src/models/ticket');
const Type = require('../../src/models/type');

test('crée un ticket en base', async () => {
  const ticketData = {
    TypeId: 1,
    email: 'test@mail.com',
    message: 'Un message de test',
  };

  const ticket = await Ticket.create(ticketData);

  expect(ticket).toBeDefined();
  expect(ticket.email).toBe('test@mail.com');
  expect(ticket.message).toBe('Un message de test');

  // Vérifier que le ticket est bien dans la base
  const fetched = await Ticket.findByPk(ticket.id);
  expect(fetched.email).toBe(ticketData.email);
});
