const sequelize = require("./sequelize");
const Book = require("./models/book");
const Borrower = require("./models/borrower");
const BorrowingProcess = require("./models/borrowingProcess");

Book.hasMany(BorrowingProcess);
BorrowingProcess.belongsTo(Book);

sequelize
  .sync({ force: true }) // { force: true } will drop and recreate tables
  .then(() => {
    console.log("Database and tables synchronized");

    // Log table information
    console.log("\nBook Table:");
    console.log(Book.getTableName());
    console.log(Book.describe());

    console.log("\nBorrower Table:");
    console.log(Borrower.getTableName());
    console.log(Borrower.describe());

    console.log("\nBorrowingProcess Table:");
    console.log(BorrowingProcess.getTableName());
    console.log(BorrowingProcess.describe());

    process.exit();
  })
  .catch((err) => console.error("Error synchronizing database:", err));
