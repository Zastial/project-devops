require('dotenv').config();
const sequelize = require('../src/database');
const Type = require('../src/models/type');
const Ticket = require('../src/models/ticket');

async function setup() {
  try {
    await sequelize.sync({ force: true });
    await Type.bulkCreate([
      { name: 'BUG' },
      { name: 'QUESTION' },
      { name: 'SUGGESTION' },
    ]);
    console.log('Types créés dans la base MariaDB.');

    Ticket.belongsTo(Type, { foreignKey: 'TypeId' });
    await Ticket.sync({ force: true });
    console.log('Modèle Ticket synchronisé avec la base de données.');
  } catch (err) {
    console.error('Erreur lors de la préparation de la base :', err);
  }  
}

module.exports = setup;