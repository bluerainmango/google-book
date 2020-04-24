const Book = require("../models/bookModel");

//! Get all saved books
exports.getAllbooks = async (req, res, next) => {
  let books = [];

  try {
    books = await Book.find();
  } catch (err) {
    res.status(500).json({
      status: "Error",
      message: "Error occurred while getting all books",
      items: null,
    });
  }

  res.status(200).json({
    status: "success",
    message: "Successfully got all books",
    items: books,
    type: "savedBooks",
  });
};

//! Save a book to DB
exports.createBook = async (req, res, next) => {
  let newBook = {};

  try {
    newBook = await Book.create(req.body);

    res.status(200).json({
      status: "success",
      message: "successfully created a new book!",
      data: newBook,
    });
  } catch (err) {
    console.log("🚨 ERROR!", err);

    // MongoDB error: duplicated data for unique field
    if (err.code === 11000) {
      res.status(400).json({
        status: "Fail",
        code: "duplicated Book",
        message: "🚨 Fail! The same book already exists!",
      });
    } else {
      res.status(500).json({
        status: "Error",
        message: "Error occurred while creating a book",
        data: null,
      });
    }
  }
};

//! Delete a book from DB
exports.deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log("🚨 ERROR!", err);

    res.status(500).json({
      status: "Error",
      message: `Error occurred while deleting a book: ${req.params.id}`,
    });
  }

  res.status(204).json({
    status: "success",
    message: `successfully deleted the book! ${req.params.id}`,
    data: null,
  });
};
