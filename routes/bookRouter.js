const express = require("express");
const router = express.Router();



const {
    addBook,
    updateBook,
    deleteBook,
    listBooks,
    searchBooks,
} = require("../controllers/bookController");

router
  .route("/")
  .get(listBooks)
  .post(addBook);
router.route("/searchBooks").get(searchBooks);
router
  .route("/:id")
  .delete(deleteBook)
  .patch(updateBook);

  module.exports = router;
