const express = require("express");
const router = express.Router();

const {
  checkOutBook,
  returnBook,
  listBooksForBorrower,showReports,exportToCsv,exportToXlsx
} = require("../controllers/borrowingProcessController");

router.route("/").patch(returnBook).post(checkOutBook);
router.get('/reports', showReports);
router.get('/export/csv', exportToCsv);
router.get('/export/xlsx', exportToXlsx);
router.route("/:borrower_id").get(listBooksForBorrower);


module.exports = router;
