const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Book = require('./book'); // Import the Book model
const Borrower = require('./borrower'); // Import the Borrower model

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
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  borrower_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Add associations
BorrowingProcess.belongsTo(Book, { foreignKey: 'book_id' });
BorrowingProcess.belongsTo(Borrower, { foreignKey: 'borrower_id' });

module.exports = BorrowingProcess;
