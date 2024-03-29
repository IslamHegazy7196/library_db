const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const BorrowingProcess = require('./borrowingProcess');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shelf_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true, 
});

module.exports = Book

