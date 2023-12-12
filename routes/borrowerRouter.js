const express = require("express");
const router = express.Router();

const {
  addBorrower,
  updateBorrower,
  deleteBorrower,
  listBorrowers,
} = require("../controllers/borrowerController");

router.route("/").get(listBorrowers).post(addBorrower);
router.route("/:id").delete(deleteBorrower).patch(updateBorrower);

module.exports = router;
