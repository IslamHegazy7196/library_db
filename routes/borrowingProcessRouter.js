const express = require("express");
const router = express.Router();

const {
  checkOutBook,
  returnBook,
  listBooksForBorrower,
} = require("../controllers/borrowingProcessController");

router.route("/").patch(returnBook).post(checkOutBook);
router.route("/:borrower_id").get(listBooksForBorrower);

module.exports = router;
