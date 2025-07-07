const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Type = sequelize.define('Type', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Type;