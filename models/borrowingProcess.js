const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const BorrowingProcess = sequelize.define('BorrowingProcess', {
  checkout_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  return_date: {
    type: DataTypes.DATE,
  },
});

module.exports = BorrowingProcess;
