const Joi = require('joi');

const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  quantity: Joi.number().integer().min(0).required(),
  shelf_location: Joi.string().required(),
});

const searchSchema = Joi.object({
  title: Joi.string(),
  author: Joi.string(),
  isbn: Joi.string(),
});

module.exports = {
  bookSchema,
  searchSchema,
};
