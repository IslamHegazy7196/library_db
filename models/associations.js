const Book = require('./book');
const Borrower = require('./borrower');
const BorrowingProcess = require('./borrowingProcess');

Book.hasMany(BorrowingProcess, { foreignKey: 'book_id' });
BorrowingProcess.belongsTo(Book, { foreignKey: 'book_id' });

Borrower.hasMany(BorrowingProcess, { foreignKey: 'borrower_id' });
BorrowingProcess.belongsTo(Borrower, { foreignKey: 'borrower_id' });
