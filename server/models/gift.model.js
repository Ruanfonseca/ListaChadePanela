const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Gift = sequelize.define('Gift', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  available: { type: DataTypes.BOOLEAN, defaultValue: true },
  chosenBy: { type: DataTypes.STRING },
  chosenByWhatsApp: { type: DataTypes.STRING }
});

module.exports = Gift;
