const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Type = require('./type');

const Ticket = sequelize.define('Ticket', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Ticket.belongsTo(Type, { foreignKey: { allowNull: false } });

module.exports = Ticket;