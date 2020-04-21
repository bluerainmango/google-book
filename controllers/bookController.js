const Book = require("../models/bookModel");

exports.getAllbooks = async (req, res, next) => {
  const books = await Book.find();

  res.status(200).json({
    status: "success",
    message: "Successfully got all books",
    items: books,
  });
};

exports.createBook = async (req, res, next) => {
  const newBook = await Book.create(req.body);

  res.status(200).json({
    status: "success",
    message: "successfully created a new book!",
    data: newBook,
  });
};

exports.deleteBook = async (req, res, next) => {
  const result = await Book.findByIdAndDelete(req.params.id);

  if (!result) {
    // error handling : 404, No book found with that id.
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
