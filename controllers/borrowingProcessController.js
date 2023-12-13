const BorrowingProcess = require("../models/borrowingProcess");
const moment = require("moment");
const { Op } = require('sequelize');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const xlsx = require("xlsx");

const showReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const startMoment = moment(startDate);
    const endMoment = moment(endDate);

    // Validate if start date is before end date
    if (
      !startMoment.isValid() ||
      !endMoment.isValid() ||
      endMoment.isBefore(startMoment)
    ) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    const borrowingProcesses = await BorrowingProcess.findAll({
      where: {
        checkout_date: {
          [Op.between]: [startMoment.toDate(), endMoment.toDate()],
        },
      },
    });

    // Display reports
    res.json(borrowingProcesses);
  } catch (error) {
    res.status(500).json({ error: error || "Internal Server Error" });
  }
};

const exportToCsv = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const startMoment = moment(startDate);
    const endMoment = moment(endDate);

    // Validate if start date is before end date
    if (
      !startMoment.isValid() ||
      !endMoment.isValid() ||
      endMoment.isBefore(startMoment)
    ) {
      return res.status(400).json({ error: "Invalid date range" });
    }

    const borrowingProcesses = await BorrowingProcess.findAll({
      where: {
        checkout_date: {
          [Op.between]: [startMoment.toDate(), endMoment.toDate()],
        },
      },
    });

    // Export to CSV
    const csvWriter = createCsvWriter({
      path: "borrowing_processes.csv",
      header: [
        { id: "id", title: "ID" },
        { id: "checkout_date", title: "Checkout Date" },
        { id: "due_date", title: "Due Date" },
        // Add more fields as needed
      ],
    });

    csvWriter
      .writeRecords(borrowingProcesses)
      .then(() => res.download("borrowing_processes.csv"))
      .catch((csvError) => res.status(500).json({ error: csvError.message }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error || "Internal Server Error" });
  }
};
const exportToXlsx = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const startMoment = moment(startDate);
    const endMoment = moment(endDate);

    // Validate if start date is before end date
    if (!startMoment.isValid() || !endMoment.isValid() || endMoment.isBefore(startMoment)) {
      return res.status(400).json({ error: 'Invalid date range' });
    }

    const borrowingProcesses = await BorrowingProcess.findAll({
      where: {
        checkout_date: {
          [Op.between]: [startMoment.toDate(), endMoment.toDate()],
        },
      },
    });

    // Export to XLSX
    const worksheet = xlsx.utils.json_to_sheet(borrowingProcesses.map(process => {
      return {
        ID: process.id,
        'Checkout Date': process.checkout_date,
        'Due Date': process.due_date,
        // Add more fields as needed
      };
    }));

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Borrowing Processes');
    const xlsxBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=borrowing_processes.xlsx');
    res.send(xlsxBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


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
    console.log(error);
    res.status(500).json({ error: error || "Internal Server Error" });
  }
};

module.exports = {
  checkOutBook,
  returnBook,
  listBooksForBorrower,
  showReports,
  exportToCsv,
  exportToXlsx,
};
