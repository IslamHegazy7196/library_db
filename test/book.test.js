const { mockRequest, mockResponse } = require('jest-mock-req-res');
const bookController = require('../controllers/bookController');
const Book = require('../models/book');
const { bookSchema } = require('../validationSchemas');
// Mock the Book model and validationSchemas
jest.mock('../models/book');
jest.mock('../validationSchemas');

describe('Book Controller Tests', () => {
  let req, res;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addBook', () => {
    it('should add a book', async () => {
      const mockBook = { "title": "Test Book", "author": "Test Author", "isbn": "1234567890","quantity":"25",
      "shelf_location":"26" };
      Book.create.mockResolvedValue(mockBook);
      
      req.body = mockBook;
      await bookController.addBook(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockBook);
    });

    it('should handle validation errors', async () => {
      const validationError = { details: [{ message: 'Validation error message' }] };

      bookSchema.validate.mockReturnValue({ error: validationError });

      req.body = { invalidData: 'test' };
      await bookController.addBook(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: validationError.details[0].message });
    });

    it('should handle internal server error', async () => {
      const internalServerError = 'Internal Server Error';

      Book.create.mockRejectedValue(internalServerError);

      req.body = { title: 'Test Book', author: 'Test Author', isbn: '1234567890' };
      await bookController.addBook(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

});
