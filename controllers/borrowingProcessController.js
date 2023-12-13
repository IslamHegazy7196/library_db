const BorrowingProcess = require("../models/borrowingProcess");
const Book = require("../models/book");
const Borrower = require("../models/borrower");

// Check out a book
const checkOutBook = async (req, res) => {
  try {
    const { book_id, borrower_id, checkout_date, due_date } = req.body;
    const borrowingProcess = await BorrowingProcess.create({
      book_id,
      borrower_id,
      checkout_date,
      due_date,
    });
    res.json(borrowingProcess);
  } catch (error) {
    res.status(500).json({ error: error || "Internal Server Error" });
  }
};


const returnBook = async (req, res) => {
  try {
    const { book_id, borrower_id, return_date } = req.body;
    const [updatedRows] = await BorrowingProcess.update(
      { return_date },
      { where: { book_id, borrower_id } }
    );

    if (!updatedRows) {
      return res.status(404).json({ error: "Borrowing process not found" });
    }

    const updatedBorrowingProcess = await BorrowingProcess.findOne({
      where: { book_id, borrower_id },
    });

    res.json(updatedBorrowingProcess);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error || "Internal Server Error" });
  }
};

const listBooksForBorrower = async (req, res) => {
  try {
    const { borrower_id } = req.params;
    if (!borrower_id || isNaN(parseInt(borrower_id))) {
      return res.status(400).json({ error: error || "Invalid borrower_id" });
    }
    const borrowingProcesses = await BorrowingProcess.findAll({
      where: { borrower_id },
    });
    console.log("11111111111111");
    res.json(borrowingProcesses);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error || "Internal Server Error" });
  }
};

module.exports = {
  checkOutBook,
  returnBook,
  listBooksForBorrower,
};
