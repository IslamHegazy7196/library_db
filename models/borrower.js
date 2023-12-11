const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Borrower = sequelize.define('Borrower', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registered_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Borrower;
