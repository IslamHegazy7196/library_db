const { Op } = require("sequelize");
const Book = require("../models/book");

// Create a book
const addBook = async (req, res) => {
  try {
    const { title, author, isbn, quantity, shelf_location } = req.body;
    const book = await Book.create({
      title,
      author,
      isbn,
      quantity,
      shelf_location,
    });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, quantity, shelf_location } = req.body;
    const [updatedRows] = await Book.update(
      { title, author, isbn, quantity, shelf_location },
      { where: { id } }
    );
    if (updatedRows > 0) {
      const updatedBook = await Book.findByPk(id);
      res.json(updatedBook);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByPk(id);
    if (!deletedBook) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    await Book.destroy({ where: { id } });
    res.json(deletedBook);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// List all books
const listBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Search for a book
const searchBooks = async (req, res) => {
  try {
    const { title, author, isbn } = req.query;
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${title}%` } },
          { author: { [Op.iLike]: `%${author}%` } },
          { isbn: { [Op.iLike]: `%${isbn}%` } },
        ],
      },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addBook,
  updateBook,
  deleteBook,
  listBooks,
  searchBooks,
};
