const Borrower = require("../models/borrower");

// Create a borrower
const addBorrower = async (req, res) => {
  try {
    const { name, email, registered_date } = req.body;
    const borrower = await Borrower.create({ name, email, registered_date });
    res.status(201).json(borrower);
  } catch (error) {
    res.status(500).json({ error: error ||"Internal Server Error" });
  }
};

// Update a borrower
const updateBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, registered_date } = req.body;
    const [updatedRows] = await Borrower.update(
      { name, email, registered_date },
      { where: { id } }
    );
    if (updatedRows > 0) {
      const updatedBorrower = await Borrower.findByPk(id);
      res.json(updatedBorrower);
    } else {
      res.status(404).json({ error: "Borrower not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error ||"Internal Server Error" });
  }
};

// Delete a borrower
const deleteBorrower = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBorrower = await Borrower.findByPk(id);
    if (!deletedBorrower) {
      res.status(404).json({ error: "Borrower not found" });
      return;
    }
    await Borrower.destroy({ where: { id } });
    res.json(deletedBorrower);
  } catch (error) {
    res.status(500).json({ error: error ||"Internal Server Error" });
  }
};

// TODO: Add search, pagination and filtering or sorting
// page and limit - return available books
// sort by borrow price - return date | asc = desc
const listBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.findAll();
    res.json(borrowers);
  } catch (error) {
    res.status(500).json({ error: error ||"Internal Server Error" });
  }
};

module.exports = {
  addBorrower,
  updateBorrower,
  deleteBorrower,
  listBorrowers,
};
